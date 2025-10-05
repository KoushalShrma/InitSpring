import { ProjectConfig, Dependency } from '../types';

interface MavenDependency {
    groupId: string;
    artifactId: string;
    scope?: 'runtime' | 'test' | 'provided';
    optional?: boolean;
}

const MAVEN_DEPENDENCY_MAP: Record<string, MavenDependency> = {
    // DevTools
    'devtools': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-devtools', scope: 'runtime', optional: true },
    'lombok': { groupId: 'org.projectlombok', artifactId: 'lombok', optional: true },
    'configuration-processor': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-configuration-processor', optional: true },
    // Web
    'web': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-web' },
    'webflux': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-webflux' },
    'graphql': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-graphql' },
    'data-rest': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-data-rest' },
    'hateoas': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-hateoas' },
    'thymeleaf': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-thymeleaf' },
    // Security
    'security': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-security' },
    'oauth2-client': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-oauth2-client' },
    'oauth2-resource-server': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-oauth2-resource-server' },
    // SQL
    'jdbc': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-jdbc' },
    'data-jpa': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-data-jpa' },
    'h2': { groupId: 'com.h2database', artifactId: 'h2', scope: 'runtime' },
    'mysql': { groupId: 'com.mysql', artifactId: 'mysql-connector-j', scope: 'runtime' },
    'postgresql': { groupId: 'org.postgresql', artifactId: 'postgresql', scope: 'runtime' },
    'sqlserver': { groupId: 'com.microsoft.sqlserver', artifactId: 'mssql-jdbc', scope: 'runtime' },
    'oracle': { groupId: 'com.oracle.database.jdbc', artifactId: 'ojdbc11', scope: 'runtime' },
    'flyway': { groupId: 'org.flywaydb', artifactId: 'flyway-core' },
    'liquibase': { groupId: 'org.liquibase', artifactId: 'liquibase-core' },
    // I/O
    'validation': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-validation' },
    'mail': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-mail' },
    // Ops
    'actuator': { groupId: 'org.springframework.boot', artifactId: 'spring-boot-starter-actuator' },
};


const generateDependencyXml = (dep: MavenDependency): string => {
    let xml = `
        <dependency>
            <groupId>${dep.groupId}</groupId>
            <artifactId>${dep.artifactId}</artifactId>`;
    if (dep.scope) {
        xml += `
            <scope>${dep.scope}</scope>`;
    }
    if (dep.optional) {
        xml += `
            <optional>true</optional>`;
    }
    xml += `
        </dependency>`;
    return xml;
};

export const generatePomXml = (config: ProjectConfig, dependencies: Dependency[]): string => {
    const dependencyXml = dependencies
        .map(d => MAVEN_DEPENDENCY_MAP[d.id])
        .filter(Boolean)
        .map(generateDependencyXml)
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.1</version> <!-- Or dynamically fetch latest stable -->
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>${config.group}</groupId>
    <artifactId>${config.artifact}</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>${config.name}</name>
    <description>${config.description}</description>
    <properties>
        <java.version>${config.javaVersion}</java.version>
    </properties>
    <dependencies>
        ${dependencyXml}
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
`;
};