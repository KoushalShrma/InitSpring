<div align="center">

<img width="1200" height="475" alt="InitSpring Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# ⚡ InitSpring

### AI-Powered Spring Boot Project Generator

*Transform your ideas into production-ready Spring Boot code — brick by brick 🧱*

[![Built with React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Powered by Groq](https://img.shields.io/badge/Groq-LPU™-00F5D4?style=for-the-badge&logoColor=white)](https://groq.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.3-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## 🎯 What is InitSpring?

**InitSpring** is an intelligent web application that generates complete, production-ready **Spring Boot backend projects** using cutting-edge AI. No more tedious boilerplate code — just describe what you need, and let AI build it for you instantly.

> 💡 **Perfect for**: Rapid prototyping • Learning Spring Boot • Bootstrapping microservices • Speeding up development workflows

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 **AI-Powered Intelligence**
- Powered by **Groq's LPU™ inference** engine
- `llama-3.3-70b-versatile` (70B params)
- `llama-4-maverick` for vision (128K context)
- Blazing-fast code generation

</td>
<td width="50%">

### 📝 **Multiple Input Methods**
- 💬 **Text** - Natural language descriptions
- 📊 **JSON** - Paste API payload schemas
- 🗃️ **SQL** - Database CREATE TABLE statements
- 🖼️ **Image** - Upload ER diagrams or sketches

</td>
</tr>
<tr>
<td width="50%">

### �️ **Complete Project Structure**
- ✅ JPA Entities with relationships
- ✅ Repository interfaces (Spring Data)
- ✅ Service layer with business logic
- ✅ REST Controllers with CRUD endpoints
- ✅ `pom.xml` and configuration files

</td>
<td width="50%">

### ⚙️ **Fully Customizable**
- 📦 20+ Spring Boot starter dependencies
- ☕ Java 8, 11, 17, or 21
- 🏷️ Custom groupId/artifactId/package
- 🎨 Professional syntax highlighting
- 📥 Download as ready-to-run ZIP

</td>
</tr>
</table>

---

## � How to Use InitSpring

### **Step 1: Choose Your Input Method**

<div align="center">

| 💬 Text Description | 📊 JSON Schema | 🗃️ SQL Schema | 🖼️ Image Upload |
|:-------------------:|:--------------:|:-------------:|:---------------:|
| *"Create a blog system with posts, comments, and users"* | Paste your API payload structure | Drop CREATE TABLE statements | Upload ER diagrams or sketches |

</div>

**Example Input (Text):**
```text
Create a library management system with books, authors, members, and borrowing records.
Books have ISBN, title, and publication date. Authors can write multiple books.
Members can borrow multiple books with due dates.
```

---

### **Step 2: Configure Your Project**

Set up project details in the configuration panel:

```yaml
Group ID:      com.example
Artifact ID:   library-api
Package Name:  com.example.libraryapi
Java Version:  17  # Options: 8, 11, 17, 21
Spring Boot:   3.x
```

---

### **Step 3: Select Dependencies**

Choose from popular Spring Boot starters:

<table>
<tr>
<td>🌐 <b>Web</b></td>
<td>Spring Web, REST APIs, Validation</td>
</tr>
<tr>
<td>🗄️ <b>Data</b></td>
<td>JPA, JDBC, MongoDB, Redis, Elasticsearch</td>
</tr>
<tr>
<td>🔒 <b>Security</b></td>
<td>Spring Security, OAuth2, JWT</td>
</tr>
<tr>
<td>☁️ <b>Cloud</b></td>
<td>Config Server, Eureka, API Gateway</td>
</tr>
<tr>
<td>📊 <b>Database</b></td>
<td>MySQL, PostgreSQL, H2, MariaDB</td>
</tr>
<tr>
<td>🔍 <b>Ops</b></td>
<td>Actuator, Prometheus, Micrometer</td>
</tr>
</table>

---

### **Step 4: Generate & Preview**

Click **"Generate Project"** and watch AI craft your code in real-time!

<div align="center">

```
  🔄 Building your project...
     Brick by brick 🧱
```

*Features the animated "K" logo loading indicator*

</div>

**What You Get:**
- 📁 Complete project structure with proper packages
- 🧩 JPA entities with `@Entity`, `@Id`, `@OneToMany`, etc.
- 🗂️ Repository interfaces extending `JpaRepository`
- 🔧 Service classes with `@Service` and business logic
- 🌐 REST Controllers with `@RestController` and CRUD endpoints
- ⚙️ Maven `pom.xml` with all selected dependencies

**Preview Features:**
- 🎨 Syntax highlighting for Java code
- 📂 Organized file tree (Controllers, Services, Repositories, Entities)
- 📋 One-click copy for any file
- 🔍 Easy navigation between generated files

---

### **Step 5: Download & Run**

Download your project as a complete Maven ZIP file:

```bash
# Extract the downloaded ZIP
unzip library-api.zip
cd library-api

# Run with Maven wrapper
./mvnw spring-boot:run

# Your API is now live at http://localhost:8080 🎉
```

**Test Your Endpoints:**
```bash
# Example: Get all books
curl http://localhost:8080/api/books

# Create a new book
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Spring in Action","isbn":"978-1617294945"}'
```

---

## 🛠️ Tech Stack

<div align="center">

| **Category** | **Technology** |
|--------------|----------------|
| Frontend | React 19, TypeScript, Tailwind CSS |
| Build Tool | Vite 6.3 (⚡ Lightning-fast HMR) |
| AI Engine | Groq SDK with LPU™ inference |
| Models | llama-3.3-70b, llama-4-maverick |
| Code Gen | Spring Boot 3.x, Maven |
| Styling | Custom CSS animations + Tailwind |

</div>

### 🧠 AI Models Specifications

| Model | Parameters | Context | Use Case |
|-------|-----------|---------|----------|
| **llama-3.3-70b-versatile** | 70B | 32K tokens | Text, JSON, SQL processing |
| **llama-4-maverick** | 17B | 128K tokens | Vision, ER diagrams, multimodal |

---

## 🎯 Use Cases

<table>
<tr>
<td width="50%">

### 👨‍💻 For Developers
- ⚡ **Rapid Prototyping** - MVP in minutes
- 🏗️ **Microservices** - Bootstrap multiple services
- 📚 **Learning** - Study best practices from generated code
- 🔄 **Modernization** - Convert legacy SQL to JPA

</td>
<td width="50%">

### 🎓 For Students & Educators
- 📖 **Learn by Example** - See Spring Boot patterns
- 🧪 **Experimentation** - Test different architectures
- 📝 **Assignments** - Quick project scaffolding
- 🔬 **Research** - AI-assisted code generation studies

</td>
</tr>
</table>

---

## 🔐 Privacy & Security

| Feature | Status |
|---------|--------|
| **Data Storage** | ❌ None - All processing is client-side |
| **API Keys** | 🔒 Stored locally in `.env.local` (gitignored) |
| **Code Privacy** | ✅ Your code never leaves your browser |
| **Open Source** | ✅ Fully transparent on GitHub |

⚠️ **Important**: Never commit `.env.local` to version control!

---

## 📸 Screenshots

<div align="center">

### Main Interface
![Main Interface](https://via.placeholder.com/800x500/0F172A/00F5D4?text=InitSpring+Main+Interface)

### Code Preview with Syntax Highlighting
![Code Preview](https://via.placeholder.com/800x500/0F172A/00F5D4?text=Syntax+Highlighted+Code+Preview)

### Dependency Selector
![Dependencies](https://via.placeholder.com/800x500/0F172A/00F5D4?text=Rich+Dependency+Selection)

</div>

*Replace placeholders with actual screenshots when available*

---

## 🎨 Design Philosophy

**InitSpring** was built with these principles:

- 🎯 **Simplicity First** - Intuitive UI, no learning curve
- ⚡ **Speed Matters** - Groq LPU™ for instant results
- 🎨 **Beautiful Code** - Clean, readable, production-ready output
- 🧱 **Brick by Brick** - Thoughtful architecture, attention to detail

---

## 🤝 About the Creator

<div align="center">

**InitSpring** was crafted with passion and precision by **[Koushal Sharma](https://www.koushal.me)**

*Built brick by brick 🧱 to revolutionize Spring Boot development*

[![GitHub](https://img.shields.io/badge/GitHub-@KoushalShrma-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KoushalShrma)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Koushal_Sharma-0077b5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/koushalshrma/)
[![Portfolio](https://img.shields.io/badge/Portfolio-koushal.me-00F5D4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.koushal.me)

</div>

---

## 📄 License

**MIT License** - Free to use, modify, and distribute

```
Copyright (c) 2025 Koushal Sharma

Permission is hereby granted, free of charge, to use this software...
```

---

<div align="center">

### 💚 Powered by Groq LPU™ Inference Engine

*Experience the future of AI-assisted development*

<br/>

**Made with ❤️ and ☕ by [Koushal Sharma](https://www.koushal.me)**

<sub>InitSpring © 2025 • All Rights Reserved</sub>

</div>
