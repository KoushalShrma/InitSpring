import Groq from "groq-sdk";
import { InputType, ProjectConfig, Dependency, GeneratedFile } from '../types';

interface ParsedEntity {
    name: string;
    fields: string[];
    relations: string[];
}

interface ParsedSchema {
    entities: ParsedEntity[];
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(error);
    });
};

const buildSqlParserPrompt = (sqlSchema: string): string => {
    return `
You are a database schema analysis tool. Your sole purpose is to parse a given SQL schema and convert it into a structured JSON format representing entities, fields, and relationships.

**Input SQL Schema:**
\`\`\`sql
${sqlSchema}
\`\`\`

**Instructions:**
1.  Identify all tables and treat them as entities.
2.  For each table, identify its columns. Determine an appropriate Java type for each column (e.g., VARCHAR -> String, INT/BIGINT -> Long, DATE/DATETIME -> LocalDateTime, BOOLEAN -> boolean).
3.  Identify primary keys.
4.  Identify foreign key constraints to determine relationships (@ManyToOne, @OneToMany).
5.  Do not generate any code, explanations, or text.
6.  Your output MUST be ONLY the JSON object.

**Output JSON Format:**
Provide a single JSON object with one key, "entities", which is an array of entity objects. Each entity object should have:
-   "name": The name of the entity (e.g., "User").
-   "fields": An array of strings describing each field (e.g., "private String username;").
-   "relations": An array of strings describing each relationship (e.g., "@OneToMany(mappedBy = "user") private Set<Post> posts;").

**Example:**
For SQL:
\`\`\`sql
CREATE TABLE users (id BIGINT PRIMARY KEY, name VARCHAR(255));
CREATE TABLE posts (id BIGINT PRIMARY KEY, title VARCHAR(255), user_id BIGINT, FOREIGN KEY (user_id) REFERENCES users(id));
\`\`\`

Your output should be:
{
  "entities": [
    {
      "name": "User",
      "fields": ["private String name;"],
      "relations": ["@OneToMany(mappedBy = \\"user\\") private Set<Post> posts;"]
    },
    {
      "name": "Post",
      "fields": ["private String title;"],
      "relations": ["@ManyToOne @JoinColumn(name = \\"user_id\\") private User user;"]
    }
  ]
}

Respond ONLY with valid JSON. No additional text or explanation.
`;
};

const parseSqlToStructuredJson = async (sqlSchema: string, groq: Groq): Promise<ParsedSchema> => {
    const prompt = buildSqlParserPrompt(sqlSchema);
    
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
    });

    try {
        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No content in response");
        }
        return JSON.parse(content.trim()) as ParsedSchema;
    } catch (e) {
        console.error("Failed to parse SQL schema with AI:", response);
        throw new Error("AI failed to parse the SQL schema into a structured format.");
    }
};


const buildPrompt = (
    inputType: InputType,
    inputValue: string,
    config: ProjectConfig,
    dependencies: Dependency[],
    preProcessedSql: boolean = false
): string => {
    const depsString = dependencies.map(d => d.name).join(', ');
    const inputDescription = {
        [InputType.TEXT]: `a natural language description: "${inputValue}"`,
        [InputType.SQL]: `the following SQL schema:\n\`\`\`sql\n${inputValue}\n\`\`\``,
        [InputType.JSON]: preProcessedSql 
            ? `a structured schema representation (pre-processed from SQL):\n\`\`\`json\n${inputValue}\n\`\`\``
            : `the following ERD JSON:\n\`\`\`json\n${inputValue}\n\`\`\``,
        [InputType.IMAGE]: `an uploaded ER diagram image.`,
    };
    
    const lombokInstruction = config.useLombok
        ? "If Lombok is a dependency, use `@Data`, `@NoArgsConstructor`, and `@AllArgsConstructor`. Ensure `@Data` is used, as it is crucial."
        : "Generate standard getters, setters, a no-arg constructor, an all-args constructor, `equals()`, `hashCode()`, and `toString()` methods manually. DO NOT use Lombok annotations.";

    return `
You are an expert Spring Boot developer specializing in creating well-structured, layered applications with JPA/Hibernate.
Your task is to generate a complete set of Java files for a new Spring Boot project based on the provided database schema description.
Generate the code as quickly as possible.

**Project Configuration:**
- Group ID: ${config.group}
- Artifact ID: ${config.artifact}
- Base Package: ${config.packageName}
- Java Version: ${config.javaVersion}
- Dependencies: ${depsString}
- Use Lombok: ${config.useLombok}

**Input Schema:**
The database schema is provided as ${inputDescription[inputType]}

**Code Formatting Rules (Follow these VERY strictly):**
1.  **Annotations:** Place each annotation on its own line, followed by a blank line before the next annotation or the declaration itself.
2.  **Declarations:** Each field and method declaration must start on a new line.
3.  **Spacing:**
    -   Use a single blank line to separate methods.
    -   Use standard Java spacing around operators (e.g., \`x = y\`, not \`x=y\`).
4.  **Indentation:** Use 4 spaces for indentation.
5.  **Structure:** Follow the standard Java class structure: fields, then constructors, then methods.

**Example of PERFECT formatting for an Entity:**
\`\`\`java
package com.example.demo.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity

@Table(name = "posts")

public class Post {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(nullable = false)

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "user_id")

    private User user;

    // Constructors, Getters/Setters follow here, each separated by a blank line...
}
\`\`\`

**Your Instructions:**
For EACH entity identified in the schema, you MUST generate FOUR files: a Controller, a Service, a Repository, and a Model (Entity).
Strictly enforce separation of concerns: Controllers for API, Services for business logic, and Entities for data state only.

**1. Model (Entity) Class:**
    -   Package: \`${config.packageName}.model\`
    -   This class is a pure data object (POJO/Entity). **It MUST NOT contain any business logic.**
    -   Specifically, do not add helper methods for managing relationships (e.g., \`addPost(Post p)\`). All relationship management logic belongs in the Service layer.
    -   Annotations: \`@Entity\`, \`@Table\`.
    -   Primary Key: Add an \`@Id\` field named \`id\` of type \`Long\`, with \`@GeneratedValue(strategy = GenerationType.IDENTITY)\`.
    -   Relationships (\`@OneToMany\`, \`@ManyToOne\`, etc.):
        -   Default to \`fetch = FetchType.LAZY\`.
        -   For \`@OneToMany\`, use \`mappedBy\` and a \`Set<T>\` collection.
        -   Use \`@JoinColumn\` on the owning side of \`@ManyToOne\` relationships.
    -   Lombok/Getters/Setters: ${lombokInstruction}

**2. Repository Interface:**
    -   Package: \`${config.packageName}.repository\`
    -   Name: \`\${EntityName}Repository\`
    -   Extend \`JpaRepository<\${EntityName}, Long>\`.
    -   Annotate with \`@Repository\`.

**3. Service Class:**
    -   Package: \`${config.packageName}.service\`
    -   Name: \`\${EntityName}Service\`
    -   Annotate with \`@Service\`.
    -   **Use constructor injection** to inject the \`\${EntityName}Repository\`.
    -   Implement full CRUD logic. This is the layer responsible for **all business logic**, including managing entity relationships.
        -   \`getAll()\`: Return \`List<\${EntityName}>\`.
        -   \`getById(Long id)\`: Return \`Optional<\${EntityName}>\`.
        -   \`create(\${EntityName} entity)\`: Save and return the new entity.
        -   \`update(Long id, \${EntityName} details)\`: Find the existing entity by ID. If found, update its fields from 'details', save, and return the updated entity. If not found, return \`Optional.empty()\`.
        -   \`delete(Long id)\`: Check if exists, then delete. Return \`boolean\` (true if deleted, false if not found).

**4. Controller Class:**
    -   Package: \`${config.packageName}.controller\`
    -   Name: \`\${EntityName}Controller\`
    -   Annotations: \`@RestController\`, \`@RequestMapping("/api/v1/\${entity_name_plural_lowercase}")\`.
    -   **Use constructor injection** to inject the \`\${EntityName}Service\`.
    -   Implement REST endpoints for all CRUD operations, returning \`ResponseEntity\`:
        -   \`GET /\`: Calls \`service.getAll()\`. Returns \`200 OK\` with the list.
        -   \`GET /{id}\`: Calls \`service.getById()\`. Returns \`200 OK\` with the entity or \`404 Not Found\`.
        -   \`POST /\`: Calls \`service.create()\`. Returns \`201 Created\` with the new entity.
        -   \`PUT /{id}\`: Calls \`service.update()\`. Returns \`200 OK\` with the updated entity or \`404 Not Found\`.
        -   \`DELETE /{id}\`: Calls \`service.delete()\`. Returns \`204 No Content\` on success or \`404 Not Found\`.

**Output Format (CRITICAL):**
You MUST respond with a valid JSON array starting with [ and ending with ].
The array must contain objects, where each object represents ONE file with this EXACT structure:
\`{ "fileName": "src/main/java/com/example/demo/model/User.java", "code": "package com.example.demo..." }\`

**JSON Structure Example:**
[
  { "fileName": "path/to/File1.java", "code": "full code here with \\\\n for newlines" },
  { "fileName": "path/to/File2.java", "code": "full code here with \\\\n for newlines" }
]

**CRITICAL RULES:**
1. Start with opening bracket [ and end with closing bracket ]
2. Each object must have ONLY two properties: "fileName" and "code"
3. Use '\\n' for all line breaks inside the 'code' property
4. Do NOT wrap the response in any markdown, comments, or extra text
5. The response must be valid JSON that can be parsed directly

Your ENTIRE response must be ONLY this JSON array. Nothing before it, nothing after it.
`;
};

export const generateProjectCode = async (
    inputType: InputType,
    inputValue: string,
    imageFile: File | null,
    config: ProjectConfig,
    dependencies: Dependency[]
): Promise<GeneratedFile[]> => {
    if (!process.env.API_KEY) {
        throw new Error("GROQ_API_KEY environment variable not set.");
    }
    
    const groq = new Groq({ 
        apiKey: process.env.API_KEY,
        dangerouslyAllowBrowser: true
    });
    
    let finalInputValue = inputValue;
    let finalInputType = inputType;
    let preProcessedSql = false;

    if (inputType === InputType.SQL && inputValue.trim()) {
        try {
            // Performance optimization: Pre-parse SQL to structured JSON
            const parsedSchema = await parseSqlToStructuredJson(inputValue, groq);
            finalInputValue = JSON.stringify(parsedSchema, null, 2);
            // Now treat it as a JSON input for the main prompt
            finalInputType = InputType.JSON;
            preProcessedSql = true;
        } catch (e) {
            // If pre-parsing fails, fall back to the original, slower method
            console.warn("SQL pre-parsing failed, falling back to direct generation.", e);
        }
    }

    const prompt = buildPrompt(finalInputType, finalInputValue, config, dependencies, preProcessedSql);
    
    let messages: any[] = [];

    if (inputType === InputType.IMAGE && imageFile) {
        // Note: Using llama-4-maverick-17b-128e-instruct for vision tasks
        // Powerful multimodal model with 128K context, supports text + images
        // Max image size: 20MB (URL), 4MB (base64), Max resolution: 33MP, Max 5 images per request
        const base64Image = await fileToBase64(imageFile);
        messages = [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: prompt
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${imageFile.type};base64,${base64Image}`
                        }
                    }
                ]
            }
        ];
    } else {
        messages = [
            {
                role: "user",
                content: prompt
            }
        ];
    }
    
    // Using llama-4-maverick-17b-128e-instruct for vision tasks
    // This is a powerful multimodal model with 128K context window
    // Note: JSON mode disabled - using regex extraction instead due to model formatting issues
    const response = await groq.chat.completions.create({
        model: inputType === InputType.IMAGE ? "meta-llama/llama-4-maverick-17b-128e-instruct" : "llama-3.3-70b-versatile",
        messages,
        temperature: 0.1
        // JSON mode disabled to avoid validation errors - we extract the array manually
    });

    const responseText = response.choices[0]?.message?.content?.trim();
    
    if (!responseText) {
        throw new Error("No response from Groq AI");
    }
    
    try {
        let parsed;
        try {
            parsed = JSON.parse(responseText);
        } catch (jsonError) {
            // Try multiple extraction strategies for malformed responses
            console.warn("Initial JSON parse failed, attempting to extract array...");
            
            let extracted = false;
            
            // Strategy 1: Look for array pattern [...] (most common)
            let arrayMatch = responseText.match(/\[[\s\S]*\]/);
            if (arrayMatch) {
                // Find the largest valid array
                const startIdx = responseText.indexOf('[');
                const endIdx = responseText.lastIndexOf(']');
                if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
                    try {
                        parsed = JSON.parse(responseText.substring(startIdx, endIdx + 1));
                        console.log("Successfully extracted JSON array (Strategy 1)");
                        extracted = true;
                    } catch (e2) {
                        console.warn("Strategy 1 failed, trying next...");
                    }
                }
            }
            
            // Strategy 2: If response starts with { and contains [, extract from first [
            if (!extracted && responseText.includes('[')) {
                const arrayStart = responseText.indexOf('[');
                const arrayEnd = responseText.lastIndexOf(']');
                if (arrayStart !== -1 && arrayEnd !== -1) {
                    try {
                        parsed = JSON.parse(responseText.substring(arrayStart, arrayEnd + 1));
                        console.log("Successfully extracted JSON array (Strategy 2)");
                        extracted = true;
                    } catch (e2) {
                        console.warn("Strategy 2 failed");
                    }
                }
            }
            
            if (!extracted) {
                console.error("JSON Parse Error:", jsonError);
                console.error("Response text (first 1000 chars):", responseText.substring(0, 1000));
                throw new Error(`Invalid JSON response from AI. Could not extract valid array. Preview: ${responseText.substring(0, 300)}...`);
            }
        }
        
        // Handle both array response and object with array property
        let generatedFiles: GeneratedFile[];
        
        if (Array.isArray(parsed)) {
            generatedFiles = parsed;
        } else if (parsed.files && Array.isArray(parsed.files)) {
            generatedFiles = parsed.files;
        } else if (parsed.generatedFiles && Array.isArray(parsed.generatedFiles)) {
            generatedFiles = parsed.generatedFiles;
        } else {
            console.error("Unexpected structure:", Object.keys(parsed));
            throw new Error(`AI returned unexpected structure. Keys found: ${Object.keys(parsed).join(', ')}`);
        }
        
        if (!Array.isArray(generatedFiles) || generatedFiles.length === 0) {
            throw new Error("AI returned empty or invalid file list.");
        }
        
        if (generatedFiles.some(f => !f.fileName || !f.code)) {
            console.error("Invalid file structure:", generatedFiles[0]);
            throw new Error("AI returned files with missing fileName or code properties.");
        }
        
        return generatedFiles;
    } catch (e) {
        console.error("Failed to parse Groq response:", responseText?.substring(0, 1000));
        if (e instanceof Error && e.message.includes('AI returned')) {
            throw e;
        }
        throw new Error("Failed to parse AI response. The model may have returned an unexpected format.");
    }
};
