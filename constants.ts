import { Dependency } from './types';

export const DEPENDENCIES: Dependency[] = [
    // Developer Tools
    { id: 'native', name: 'GraalVM Native Support', description: 'Support for compiling Spring applications to native executables using the GraalVM native-image compiler.', category: 'Developer Tools' },
    { id: 'dgs-codegen', name: 'GraphQL DGS Code Generation', description: 'Generate data types and type-safe APIs for querying GraphQL APIs by parsing schema files.', category: 'Developer Tools' },
    { id: 'devtools', name: 'Spring Boot DevTools', description: 'Provides fast application restarts, LiveReload, and configurations for enhanced development experience.', category: 'Developer Tools' },
    { id: 'lombok', name: 'Lombok', description: 'Java annotation library which helps to reduce boilerplate code.', category: 'Developer Tools' },
    { id: 'configuration-processor', name: 'Spring Configuration Processor', description: 'Generate metadata for developers to offer contextual help and "code completion" when working with custom configuration keys (ex.application.properties/.yml files).', category: 'Developer Tools' },
    { id: 'docker-compose', name: 'Docker Compose Support', description: 'Provides docker compose support for enhanced development experience.', category: 'Developer Tools' },
    { id: 'modulith', name: 'Spring Modulith', description: 'Support for building modular monolithic applications.', category: 'Developer Tools' },

    // Web
    { id: 'web', name: 'Spring Web', description: 'Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.', category: 'Web' },
    { id: 'webflux', name: 'Spring Reactive Web', description: 'Build reactive web applications with Spring WebFlux and Netty.', category: 'Web' },
    { id: 'spring-restclient', name: 'HTTP Client', description: 'Spring Boot integration for RestClient and RestTemplate to make HTTP requests.', category: 'Web' },
    { id: 'spring-webclient', name: 'Reactive HTTP Client', description: 'Spring Boot integration for WebClient to make reactive HTTP requests.', category: 'Web' },
    { id: 'graphql', name: 'Spring for GraphQL', description: 'Build GraphQL applications with Spring for GraphQL and GraphQL Java.', category: 'Web' },
    { id: 'data-rest', name: 'Rest Repositories', description: 'Exposing Spring Data repositories over REST via Spring Data REST.', category: 'Web' },
    { id: 'session-data-mongodb', name: 'Spring Session for Spring Data MongoDB', description: 'Provides an API and a Spring Data MongoDB implementation for managing user session information.', category: 'Web' },
    { id: 'session-data-redis', name: 'Spring Session for Spring Data Redis', description: 'Provides an API and a Spring Data Redis implementation for managing user session information.', category: 'Web' },
    { id: 'session-hazelcast', name: 'Spring Session for Hazelcast', description: 'Provides an API and a Hazelcast implementation for managing user session information.', category: 'Web' },
    { id: 'session-jdbc', name: 'Spring Session for JDBC', description: 'Provides an API and a JDBC implementation for managing user session information.', category: 'Web' },
    { id: 'data-rest-explorer', name: 'Rest Repositories HAL Explorer', description: 'Browsing Spring Data REST repositories in your browser.', category: 'Web' },
    { id: 'hateoas', name: 'Spring HATEOAS', description: 'Eases the creation of RESTful APIs that follow the HATEOAS principle when working with Spring / Spring MVC.', category: 'Web' },
    { id: 'web-services', name: 'Spring Web Services', description: 'Facilitates contract-first SOAP development. Allows for the creation of flexible web services using one of the many ways to manipulate XML payloads.', category: 'Web' },
    { id: 'jersey', name: 'Jersey', description: 'Framework for developing RESTful Web Services in Java that provides support for JAX-RS APIs.', category: 'Web' },
    { id: 'vaadin', name: 'Vaadin', description: 'The full-stack web app platform for Spring. Build views fully in Java with Flow, or in React using Hilla.', category: 'Web' },
    { id: 'netflix-dgs', name: 'Netflix DGS', description: 'Build GraphQL applications with Netflix DGS and Spring for GraphQL.', category: 'Web' },
    { id: 'htmx', name: 'htmx', description: 'Build modern user interfaces with the simplicity and power of hypertext.', category: 'Web' },
    
    // Template Engines
    { id: 'thymeleaf', name: 'Thymeleaf', description: 'A modern server-side Java template engine for both web and standalone environments. Allows HTML to be correctly displayed in browsers and as static prototypes.', category: 'Template Engines' },
    { id: 'freemarker', name: 'Apache Freemarker', description: 'Java library to generate text output (HTML web pages, e-mails, configuration files, source code, etc.) based on templates and changing data.', category: 'Template Engines' },
    { id: 'mustache', name: 'Mustache', description: 'Logic-less templates for both web and standalone environments. There are no if statements, else clauses, or for loops. Instead there are only tags.', category: 'Template Engines' },
    { id: 'groovy-templates', name: 'Groovy Templates', description: 'Groovy templating engine.', category: 'Template Engines' },
    { id: 'jte', name: 'JTE', description: 'Secure and lightweight template engine for Java and Kotlin.', category: 'Template Engines' },

    // Security
    { id: 'security', name: 'Spring Security', description: 'Highly customizable authentication and access-control framework for Spring applications.', category: 'Security' },
    { id: 'oauth2-client', name: 'OAuth2 Client', description: 'Spring Boot integration for Spring Security\'s OAuth2/OpenID Connect client features.', category: 'Security' },
    { id: 'oauth2-authorization-server', name: 'OAuth2 Authorization Server', description: 'Spring Boot integration for Spring Authorization Server.', category: 'Security' },
    { id: 'oauth2-resource-server', name: 'OAuth2 Resource Server', description: 'Spring Boot integration for Spring Security\'s OAuth2 resource server features.', category: 'Security' },
    { id: 'spring-security-webauthn', name: 'WebAuthn for Spring Security', description: 'Support for WebAuthn in Spring Security.', category: 'Security' },
    { id: 'data-ldap', name: 'Spring LDAP', description: 'Makes it easier to build Spring based applications that use the Lightweight Directory Access Protocol.', category: 'Security' },

    // SQL
    { id: 'jdbc', name: 'JDBC API', description: 'Database Connectivity API that defines how a client may connect and query a database.', category: 'SQL' },
    { id: 'data-jpa', name: 'Spring Data JPA', description: 'Persist data in SQL stores with Java Persistence API using Spring Data and Hibernate.', category: 'SQL' },
    { id: 'data-jdbc', name: 'Spring Data JDBC', description: 'Persist data in SQL stores with plain JDBC using Spring Data.', category: 'SQL' },
    { id: 'data-r2dbc', name: 'Spring Data R2DBC', description: 'Provides Reactive Relational Database Connectivity to persist data in SQL stores using Spring Data in reactive applications.', category: 'SQL' },
    { id: 'mybatis', name: 'MyBatis Framework', description: 'Persistence framework with support for custom SQL, stored procedures and advanced mappings. MyBatis couples objects with stored procedures or SQL statements using a XML descriptor or annotations.', category: 'SQL' },
    { id: 'liquibase', name: 'Liquibase Migration', description: 'Liquibase database migration and source control library.', category: 'SQL' },
    { id: 'flyway', name: 'Flyway Migration', description: 'Version control for your database so you can migrate from any version (incl. an empty database) to the latest version of the schema.', category: 'SQL' },
    { id: 'jooq', name: 'JOOQ Access Layer', description: 'Generate Java code from your database and build type safe SQL queries through a fluent API.', category: 'SQL' },
    { id: 'db2', name: 'IBM DB2 Driver', description: 'A JDBC driver that provides access to IBM DB2.', category: 'SQL' },
    { id: 'derby', name: 'Apache Derby Database', description: 'An open source relational database implemented entirely in Java.', category: 'SQL' },
    { id: 'h2', name: 'H2 Database', description: 'Provides a fast in-memory database that supports JDBC API and R2DBC access, with a small (2mb) footprint. Supports embedded and server modes as well as a browser based console application.', category: 'SQL' },
    { id: 'hsql', name: 'HyperSQL Database', description: 'Lightweight 100% Java SQL Database Engine.', category: 'SQL' },
    { id: 'mariadb', name: 'MariaDB Driver', description: 'MariaDB JDBC and R2DBC driver.', category: 'SQL' },
    { id: 'sqlserver', name: 'MS SQL Server Driver', description: 'A JDBC and R2DBC driver that provides access to Microsoft SQL Server and Azure SQL Database from any Java application.', category: 'SQL' },
    { id: 'mysql', name: 'MySQL Driver', description: 'MySQL JDBC driver.', category: 'SQL' },
    { id: 'oracle', name: 'Oracle Driver', description: 'A JDBC driver that provides access to Oracle.', category: 'SQL' },
    { id: 'postgresql', name: 'PostgreSQL Driver', description: 'A JDBC and R2DBC driver that allows Java programs to connect to a PostgreSQL database using standard, database independent Java code.', category: 'SQL' },

    // NoSQL
    { id: 'data-redis', name: 'Spring Data Redis (Access+Driver)', description: 'Advanced and thread-safe Java Redis client for synchronous, asynchronous, and reactive usage. Supports Cluster, Sentinel, Pipelining, Auto-Reconnect, Codecs and much more.', category: 'NoSQL' },
    { id: 'data-redis-reactive', name: 'Spring Data Reactive Redis', description: 'Access Redis key-value data stores in a reactive fashion with Spring Data Redis.', category: 'NoSQL' },
    { id: 'data-mongodb', name: 'Spring Data MongoDB', description: 'Store data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time.', category: 'NoSQL' },
    { id: 'data-mongodb-reactive', name: 'Spring Data Reactive MongoDB', description: 'Provides asynchronous stream processing with non-blocking back pressure for MongoDB.', category: 'NoSQL' },
    { id: 'data-elasticsearch', name: 'Spring Data Elasticsearch (Access+Driver)', description: 'A distributed, RESTful search and analytics engine with Spring Data Elasticsearch.', category: 'NoSQL' },
    { id: 'data-cassandra', name: 'Spring Data for Apache Cassandra', description: 'A free and open-source, distributed, NoSQL database management system that offers high-scalability and high-performance.', category: 'NoSQL' },
    { id: 'data-cassandra-reactive', name: 'Spring Data Reactive for Apache Cassandra', description: 'Access Cassandra NoSQL Database in a reactive fashion.', category: 'NoSQL' },
    { id: 'data-couchbase', name: 'Spring Data Couchbase', description: 'NoSQL document-oriented database that offers in memory-first architecture, geo-distributed deployments, and workload isolation.', category: 'NoSQL' },
    { id: 'data-couchbase-reactive', name: 'Spring Data Reactive Couchbase', description: 'Access Couchbase NoSQL database in a reactive fashion with Spring Data Couchbase.', category: 'NoSQL' },
    { id: 'data-neo4j', name: 'Spring Data Neo4j', description: 'An open source NoSQL database that stores data structured as graphs consisting of nodes, connected by relationships.', category: 'NoSQL' },

    // Messaging
    { id: 'integration', name: 'Spring Integration', description: 'Adds support for Enterprise Integration Patterns. Enables lightweight messaging and supports integration with external systems via declarative adapters.', category: 'Messaging' },
    { id: 'amqp', name: 'Spring for RabbitMQ', description: 'Gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.', category: 'Messaging' },
    { id: 'amqp-streams', name: 'Spring for RabbitMQ Streams', description: 'Building stream processing applications with RabbitMQ.', category: 'Messaging' },
    { id: 'kafka', name: 'Spring for Apache Kafka', description: 'Publish, subscribe, store, and process streams of records.', category: 'Messaging' },
    { id: 'kafka-streams', name: 'Spring for Apache Kafka Streams', description: 'Building stream processing applications with Apache Kafka Streams.', category: 'Messaging' },
    { id: 'activemq', name: 'Spring for Apache ActiveMQ 5', description: 'Spring JMS support with Apache ActiveMQ \'Classic\'.', category: 'Messaging' },
    { id: 'artemis', name: 'Spring for Apache ActiveMQ Artemis', description: 'Spring JMS support with Apache ActiveMQ Artemis.', category: 'Messaging' },
    { id: 'pulsar', name: 'Spring for Apache Pulsar', description: 'Build messaging applications with Apache Pulsar', category: 'Messaging' },
    { id: 'pulsar-reactive', name: 'Spring for Apache Pulsar (Reactive)', description: 'Build reactive messaging applications with Apache Pulsar', category: 'Messaging' },
    { id: 'websocket', name: 'WebSocket', description: 'Build Servlet-based WebSocket applications with SockJS and STOMP.', category: 'Messaging' },
    { id: 'rsocket', name: 'RSocket', description: 'RSocket.io applications with Spring Messaging and Netty.', category: 'Messaging' },
    { id: 'camel', name: 'Apache Camel', description: 'Apache Camel is an open source integration framework that empowers you to quickly and easily integrate various systems consuming or producing data.', category: 'Messaging' },
    { id: 'solace', name: 'Solace PubSub+', description: 'Connect to a Solace PubSub+ Advanced Event Broker to publish, subscribe, request/reply and store/replay messages', category: 'Messaging' },

    // I/O
    { id: 'batch', name: 'Spring Batch', description: 'Batch applications with transactions, retry/skip and chunk based processing.', category: 'I/O' },
    { id: 'validation', name: 'Validation', description: 'Bean Validation with Hibernate validator.', category: 'I/O' },
    { id: 'mail', name: 'Java Mail Sender', description: 'Send email using Java Mail and Spring Framework\'s JavaMailSender.', category: 'I/O' },
    { id: 'quartz', name: 'Quartz Scheduler', description: 'Schedule jobs using Quartz.', category: 'I/O' },
    { id: 'cache', name: 'Spring Cache Abstraction', description: 'Provides cache-related operations, such as the ability to update the content of the cache, but does not provide the actual data store.', category: 'I/O' },
    { id: 'spring-shell', name: 'Spring Shell', description: 'Build command line applications with spring.', category: 'I/O' },
    { id: 'spring-grpc', name: 'Spring gRPC', description: 'Support for gRPC, a high performance, open source universal RPC framework.', category: 'I/O' },

    // Ops
    { id: 'actuator', name: 'Spring Boot Actuator', description: 'Supports built in (or custom) endpoints that let you monitor and manage your application - such as application health, metrics, sessions, etc.', category: 'Ops' },
    { id: 'sbom-cyclone-dx', name: 'CycloneDX SBOM support', description: 'Creates a Software Bill of Materials in CycloneDX format.', category: 'Ops' },
    { id: 'codecentric-spring-boot-admin-client', name: 'codecentric\'s Spring Boot Admin (Client)', description: 'Required for your application to register with a Codecentric\'s Spring Boot Admin Server instance.', category: 'Ops' },
    { id: 'codecentric-spring-boot-admin-server', name: 'codecentric\'s Spring Boot Admin (Server)', description: 'A community project to manage and monitor your Spring Boot applications. Provides a UI on top of the Spring Boot Actuator endpoints.', category: 'Ops' },
    { id: 'sentry', name: 'Sentry', description: 'Application performance monitoring and error tracking that help software teams see clearer, solve quicker, and learn continuously.', category: 'Ops' },
    
    // Observability
    { id: 'datadog', name: 'Datadog', description: 'Publish Micrometer metrics to Datadog, a dimensional time-series SaaS with built-in dashboarding and alerting.', category: 'Observability' },
    { id: 'dynatrace', name: 'Dynatrace', description: 'Publish Micrometer metrics to Dynatrace, a platform featuring observability, AIOps, application security and analytics.', category: 'Observability' },
    { id: 'influx', name: 'Influx', description: 'Publish Micrometer metrics to InfluxDB, a dimensional time-series server that support real-time stream processing of data.', category: 'Observability' },
    { id: 'graphite', name: 'Graphite', description: 'Publish Micrometer metrics to Graphite, a hierarchical metrics system backed by a fixed-size database.', category: 'Observability' },
    { id: 'new-relic', name: 'New Relic', description: 'Publish Micrometer metrics to New Relic, a SaaS offering with a full UI and a query language called NRQL.', category: 'Observability' },
    { id: 'otlp-metrics', name: 'OTLP for metrics', description: 'Publish Micrometer metrics to an OpenTelemetry Protocol (OTLP) capable backend.', category: 'Observability' },
    { id: 'prometheus', name: 'Prometheus', description: 'Expose Micrometer metrics in Prometheus format, an in-memory dimensional time series database with a simple built-in UI, a custom query language, and math operations.', category: 'Observability' },
    { id: 'distributed-tracing', name: 'Distributed Tracing', description: 'Enable span and trace IDs in logs.', category: 'Observability' },
    { id: 'wavefront', name: 'Wavefront', description: 'Publish metrics and optionally distributed traces to Tanzu Observability by Wavefront, a SaaS-based metrics monitoring and analytics platform that lets you visualize, query, and alert over data from across your entire stack.', category: 'Observability' },
    { id: 'zipkin', name: 'Zipkin', description: 'Enable and expose span and trace IDs to Zipkin.', category: 'Observability' },

    // Testing
    { id: 'restdocs', name: 'Spring REST Docs', description: 'Document RESTful services by combining hand-written with Asciidoctor and auto-generated snippets produced with Spring MVC Test.', category: 'Testing' },
    { id: 'testcontainers', name: 'Testcontainers', description: 'Provide lightweight, throwaway instances of common databases, Selenium web browsers, or anything else that can run in a Docker container.', category: 'Testing' },
    { id: 'cloud-contract-verifier', name: 'Contract Verifier', description: 'Moves TDD to the level of software architecture by enabling Consumer Driven Contract (CDC) development.', category: 'Testing' },
    { id: 'cloud-contract-stub-runner', name: 'Contract Stub Runner', description: 'Stub Runner for HTTP/Messaging based communication. Allows creating WireMock stubs from RestDocs tests.', category: 'Testing' },
    { id: 'unboundid-ldap', name: 'Embedded LDAP Server', description: 'Provides a platform neutral way for running a LDAP server in unit tests.', category: 'Testing' },

    // Spring Cloud
    { id: 'cloud-starter', name: 'Cloud Bootstrap', description: 'Non-specific Spring Cloud features, unrelated to external libraries or integrations (e.g. Bootstrap context and @RefreshScope).', category: 'Spring Cloud' },
    { id: 'cloud-function', name: 'Function', description: 'Promotes the implementation of business logic via functions and supports a uniform programming model across serverless providers, as well as the ability to run standalone (locally or in a PaaS).', category: 'Spring Cloud' },
    { id: 'cloud-task', name: 'Task', description: 'Allows a user to develop and run short lived microservices using Spring Cloud. Run them locally, in the cloud, and on Spring Cloud Data Flow.', category: 'Spring Cloud' },

    // Spring Cloud Config
    { id: 'cloud-config-client', name: 'Config Client', description: 'Client that connects to a Spring Cloud Config Server to fetch the application\'s configuration.', category: 'Spring Cloud Config' },
    { id: 'cloud-config-server', name: 'Config Server', description: 'Central management for configuration via Git, SVN, or HashiCorp Vault.', category: 'Spring Cloud Config' },
    { id: 'cloud-starter-vault-config', name: 'Vault Configuration', description: 'Provides client-side support for externalized configuration in a distributed system. Using HashiCorp\'s Vault you have a central place to manage external secret properties for applications across all environments.', category: 'Spring Cloud Config' },
    { id: 'cloud-starter-zookeeper-config', name: 'Apache Zookeeper Configuration', description: 'Enable and configure common patterns inside your application and build large distributed systems with Apache Zookeeper based components. The provided patterns include Service Discovery and Configuration.', category: 'Spring Cloud Config' },
    { id: 'cloud-starter-consul-config', name: 'Consul Configuration', description: 'Enable and configure the common patterns inside your application and build large distributed systems with Hashicorp’s Consul. The patterns provided include Service Discovery, Distributed Configuration and Control Bus.', category: 'Spring Cloud Config' },

    // Spring Cloud Discovery
    { id: 'cloud-eureka', name: 'Eureka Discovery Client', description: 'A REST based service for locating services for the purpose of load balancing and failover of middle-tier servers.', category: 'Spring Cloud Discovery' },
    { id: 'cloud-eureka-server', name: 'Eureka Server', description: 'spring-cloud-netflix Eureka Server.', category: 'Spring Cloud Discovery' },
    { id: 'cloud-starter-zookeeper-discovery', name: 'Apache Zookeeper Discovery', description: 'Service discovery with Apache Zookeeper.', category: 'Spring Cloud Discovery' },
    { id: 'cloud-starter-consul-discovery', name: 'Consul Discovery', description: 'Service discovery with Hashicorp Consul.', category: 'Spring Cloud Discovery' },

    // Spring Cloud Routing
    { id: 'cloud-gateway', name: 'Gateway', description: 'Provides a simple, yet effective way to route to APIs in Servlet-based applications. Provides cross-cutting concerns to those APIs such as security, monitoring/metrics, and resiliency.', category: 'Spring Cloud Routing' },
    { id: 'cloud-gateway-reactive', name: 'Reactive Gateway', description: 'Provides a simple, yet effective way to route to APIs in reactive applications. Provides cross-cutting concerns to those APIs such as security, monitoring/metrics, and resiliency.', category: 'Spring Cloud Routing' },
    { id: 'cloud-feign', name: 'OpenFeign', description: 'Declarative REST Client. OpenFeign creates a dynamic implementation of an interface decorated with JAX-RS or Spring MVC annotations.', category: 'Spring Cloud Routing' },
    { id: 'cloud-loadbalancer', name: 'Cloud LoadBalancer', description: 'Client-side load-balancing with Spring Cloud LoadBalancer.', category: 'Spring Cloud Routing' },

    // Spring Cloud Circuit Breaker
    { id: 'cloud-resilience4j', name: 'Resilience4J', description: 'Spring Cloud Circuit breaker with Resilience4j as the underlying implementation.', category: 'Spring Cloud Circuit Breaker' },

    // Spring Cloud Messaging
    { id: 'cloud-bus', name: 'Cloud Bus', description: 'Links nodes of a distributed system with a lightweight message broker which can used to broadcast state changes or other management instructions (requires a binder, e.g. Apache Kafka or RabbitMQ).', category: 'Spring Cloud Messaging' },
    { id: 'cloud-stream', name: 'Cloud Stream', description: 'Framework for building highly scalable event-driven microservices connected with shared messaging systems (requires a binder, e.g. Apache Kafka, Apache Pulsar, RabbitMQ, or Solace PubSub+).', category: 'Spring Cloud Messaging' },

    // VMware Tanzu Application Service
    { id: 'scs-config-client', name: 'Config Client (TAS)', description: 'Config client on VMware Tanzu Application Service.', category: 'VMware Tanzu Application Service' },
    { id: 'scs-service-registry', name: 'Service Registry (TAS)', description: 'Eureka service discovery client on VMware Tanzu Application Service.', category: 'VMware Tanzu Application Service' },
    
    // VMware Tanzu Spring Enterprise Extensions
    { id: 'tanzu-governance-starter', name: 'Governance Starter [Enterprise]', description: 'The Enterprise Spring Boot Governance Starter library enforces cipher and TLS security based on the industry standard, and empowers Spring developers to auto-generate compliance and governance reporting information for their applications.', category: 'VMware Tanzu Spring Enterprise Extensions' },
    { id: 'tanzu-scg-access-control', name: 'Spring Cloud Gateway Access Control [Enterprise]', description: 'Spring Cloud Gateway filters for access control based on API keys or JWT Tokens.', category: 'VMware Tanzu Spring Enterprise Extensions' },
    { id: 'tanzu-scg-custom', name: 'Spring Cloud Gateway Custom [Enterprise]', description: 'Spring Cloud Gateway utilities to help develop custom filters and predicates.', category: 'VMware Tanzu Spring Enterprise Extensions' },
    { id: 'tanzu-scg-graphql', name: 'Spring Cloud Gateway GraphQL [Enterprise]', description: 'Spring Cloud Gateway filters to restrict GraphQL operations.', category: 'VMware Tanzu Spring Enterprise Extensions' },
    { id: 'tanzu-scg-sso', name: 'Spring Cloud Gateway Single Sign On [Enterprise]', description: 'Spring Cloud Gateway filters to add single sign-on (SSO) and restrict traffic based on roles or scopes.', category: 'VMware Tanzu Spring Enterprise Extensions' },
    { id: 'tanzu-scg-traffic-control', name: 'Spring Cloud Gateway Traffic Control [Enterprise]', description: 'Spring Cloud Gateway filters to restrict traffic based on request parameters and add circuit breakers.', category: 'VMware Tanzu Spring Enterprise Extensions' },
    { id: 'tanzu-scg-transformation', name: 'Spring Cloud Gateway Transformation [Enterprise]', description: 'Spring Cloud Gateway filters to transform the response before returning downstream.', category: 'VMware Tanzu Spring Enterprise Extensions' },
    
    // Microsoft Azure
    { id: 'azure-support', name: 'Azure Support', description: 'Auto-configuration for Azure Services (Service Bus, Storage, Active Directory, Key Vault, and more).', category: 'Microsoft Azure' },
    { id: 'azure-active-directory', name: 'Azure Active Directory', description: 'Spring Security integration with Azure Active Directory for authentication.', category: 'Microsoft Azure' },
    { id: 'azure-cosmos-db', name: 'Azure Cosmos DB', description: 'Fully managed NoSQL database service for modern app development, including Spring Data support.', category: 'Microsoft Azure' },
    { id: 'azure-keyvault', name: 'Azure Key Vault', description: 'All key vault features are supported, e.g. manage application secrets and certificates.', category: 'Microsoft Azure' },
    { id: 'azure-storage', name: 'Azure Storage', description: 'All Storage features are supported, e.g. blob, fileshare and queue.', category: 'Microsoft Azure' },
    
    // Google Cloud
    { id: 'cloud-gcp', name: 'Google Cloud Support', description: 'Contains auto-configuration support for every Google Cloud integration. Most of the auto-configuration code is only enabled if other dependencies are added to the classpath.', category: 'Google Cloud' },
    { id: 'cloud-gcp-pubsub', name: 'Google Cloud Messaging', description: 'Adds the Google Cloud Support entry and all the required dependencies so that the Google Cloud Pub/Sub integration work out of the box.', category: 'Google Cloud' },
    { id: 'cloud-gcp-storage', name: 'Google Cloud Storage', description: 'Adds the Google Cloud Support entry and all the required dependencies so that the Google Cloud Storage integration work out of the box.', category: 'Google Cloud' },

    // AI
    { id: 'spring-ai-anthropic', name: 'Anthropic Claude', description: 'Spring AI support for Anthropic Claude AI models.', category: 'AI' },
    { id: 'spring-ai-azure-openai', name: 'Azure OpenAI', description: 'Spring AI support for Azure’s OpenAI offering, powered by ChatGPT. It extends beyond traditional OpenAI capabilities, delivering AI-driven text generation with enhanced functionality.', category: 'AI' },
    { id: 'spring-ai-vectordb-azure', name: 'Azure AI Search', description: 'Spring AI vector database support for Azure AI Search. It is an AI-powered information retrieval platform and part of Microsoft’s larger AI platform. Among other features, it allows users to query information using vector-based storage and retrieval.', category: 'AI' },
    { id: 'spring-ai-bedrock', name: 'Amazon Bedrock', description: 'Spring AI support for Amazon Bedrock Cohere and Titan Embedding Models.', category: 'AI' },
    { id: 'spring-ai-bedrock-converse', name: 'Amazon Bedrock Converse', description: 'Spring AI support for Amazon Bedrock Converse. It provides a unified interface for conversational AI models with enhanced capabilities including function/tool calling, multimodal inputs, and streaming responses.', category: 'AI' },
    { id: 'spring-ai-vectordb-cassandra', name: 'Apache Cassandra Vector Database', description: 'Spring AI vector database support for Apache Cassandra.', category: 'AI' },
    { id: 'spring-ai-vectordb-chroma', name: 'Chroma Vector Database', description: 'Spring AI vector database support for Chroma. It is an open-source embedding database and gives you the tools to store document embeddings, content, and metadata. It also allows to search through those embeddings, including metadata filtering.', category: 'AI' },
    { id: 'spring-ai-vectordb-elasticsearch', name: 'Elasticsearch Vector Database', description: 'Spring AI vector database support for Elasticsearch.', category: 'AI' },
    { id: 'spring-ai-vectordb-gemfire', name: 'GemFire Vector Database', description: 'Spring AI vector database support for GemFire.', category: 'AI' },
    { id: 'spring-ai-mcp-server', name: 'Model Context Protocol Server', description: 'Spring AI support for Model Context Protocol (MCP) servers.', category: 'AI' },
    { id: 'spring-ai-mcp-client', name: 'Model Context Protocol Client', description: 'Spring AI support for Model Context Protocol (MCP) clients.', category: 'AI' },
    { id: 'spring-ai-vectordb-milvus', name: 'Milvus Vector Database', description: 'Spring AI vector database support for Milvus. It is an open-source vector database that has garnered significant attention in the fields of data science and machine learning. One of its standout features lies in its robust support for vector indexing and querying.', category: 'AI' },
    { id: 'spring-ai-mistral', name: 'Mistral AI', description: 'Spring AI support for Mistral AI, the open and portable generative AI for devs and businesses.', category: 'AI' },
    { id: 'spring-ai-vectordb-mongodb-atlas', name: 'MongoDB Atlas Vector Database', description: 'Spring AI vector database support for MongoDB Atlas. Is is a fully managed cloud database service that provides an easy way to deploy, operate, and scale a MongoDB database in the cloud.', category: 'AI' },
    { id: 'spring-ai-vectordb-neo4j', name: 'Neo4j Vector Database', description: 'Spring AI vector database support for Neo4j\'s Vector Search. It allows users to query vector embeddings from large datasets.', category: 'AI' },
    { id: 'spring-ai-ollama', name: 'Ollama', description: 'Spring AI support for Ollama. It allows you to run various Large Language Models (LLMs) locally and generate text from them.', category: 'AI' },
    { id: 'spring-ai-openai', name: 'OpenAI', description: 'Spring AI support for ChatGPT, the AI language model and DALL-E, the Image generation model from OpenAI.', category: 'AI' },
    { id: 'spring-ai-chat-memory-repository-in-memory', name: 'In-memory Chat Memory Repository', description: 'Spring AI support for in-memory chat memory repository.', category: 'AI' },
    { id: 'spring-ai-chat-memory-repository-jdbc', name: 'JDBC Chat Memory Repository', description: 'Spring AI support for JDBC based chat memory.', category: 'AI' },
    { id: 'spring-ai-chat-memory-repository-cassandra', name: 'Cassandra Chat Memory Repository', description: 'Spring AI support for Cassandra based chat memory.', category: 'AI' },
    { id: 'spring-ai-chat-memory-repository-neo4j', name: 'Neo4j Chat Memory Repository', description: 'Spring AI support for Neo4j based chat memory.', category: 'AI' },
    { id: 'spring-ai-vectordb-oracle', name: 'Oracle Vector Database', description: 'Spring AI vector database support for Oracle. Enables storing, indexing and searching vector embeddings in Oracle Database 23ai.', category: 'AI' },
    { id: 'spring-ai-vectordb-pgvector', name: 'PGvector Vector Database', description: 'Spring AI vector database support for PGvector. It is an open-source extension for PostgreSQL that enables storing and searching over machine learning-generated embeddings.', category: 'AI' },
    { id: 'spring-ai-vectordb-pinecone', name: 'Pinecone Vector Database', description: 'Spring AI vector database support for Pinecone. It is a popular cloud-based vector database and allows you to store and search vectors efficiently.', category: 'AI' },
    { id: 'spring-ai-postgresml', name: 'PostgresML', description: 'Spring AI support for the PostgresML text embeddings models.', category: 'AI' },
    { id: 'spring-ai-vectordb-redis', name: 'Redis Search and Query Vector Database', description: 'Spring AI vector database support for Redis Search and Query. It extends the core features of Redis OSS and allows you to use Redis as a vector database.', category: 'AI' },
    { id: 'spring-ai-vectordb-mariadb', name: 'MariaDB Vector Database', description: 'Spring AI support for MariaDB. MariaDB Vector Store support is part of MariaDB 11.7. It provides efficient vector similarity search capabilities using vector indexes, supporting both cosine similarity and Euclidean distance metrics.', category: 'AI' },
    { id: 'spring-ai-vectordb-azurecosmosdb', name: 'Azure Cosmos DB Vector Store', description: 'Spring AI support for Azure Cosmos DB. Azure Cosmos DB is Microsoft’s globally distributed cloud-native database service designed for mission-critical applications.', category: 'AI' },
    { id: 'spring-ai-stabilityai', name: 'Stability AI', description: 'Spring AI support for Stability AI\'s text to image generation model.', category: 'AI' },
    { id: 'spring-ai-transformers', name: 'Transformers (ONNX) Embeddings', description: 'Spring AI support for pre-trained transformer models, serialized into the Open Neural Network Exchange (ONNX) format.', category: 'AI' },
    { id: 'spring-ai-vertexai-gemini', name: 'Vertex AI Gemini', description: 'Spring AI support for Google Vertex Gemini chat. Doesn\'t support embeddings.', category: 'AI' },
    { id: 'spring-ai-vertexai-embeddings', name: 'Vertex AI Embeddings', description: 'Spring AI support for Google Vertex text and multimodal embedding models.', category: 'AI' },
    { id: 'spring-ai-vectordb-qdrant', name: 'Qdrant Vector Database', description: 'Spring AI vector database support for Qdrant. It is an open-source, high-performance vector search engine/database.', category: 'AI' },
    { id: 'spring-ai-vectordb-typesense', name: 'Typesense Vector Database', description: 'Spring AI vector database support for Typesense.', category: 'AI' },
    { id: 'spring-ai-vectordb-weaviate', name: 'Weaviate Vector Database', description: 'Spring AI vector database support for Weaviate, an open-source vector database. It allows you to store data objects and vector embeddings from your favorite ML-models and scale seamlessly into billions of data objects.', category: 'AI' },
    { id: 'spring-ai-markdown-document-reader', name: 'Markdown Document Reader', description: 'Spring AI Markdown document reader. It allows to load Markdown documents, converting them into a list of Spring AI Document objects.', category: 'AI' },
    { id: 'spring-ai-tika-document-reader', name: 'Tika Document Reader', description: 'Spring AI Tika document reader. It uses Apache Tika to extract text from a variety of document formats, such as PDF, DOC/DOCX, PPT/PPTX, and HTML. The documents are converted into a list of Spring AI Document objects.', category: 'AI' },
    { id: 'spring-ai-pdf-document-reader', name: 'PDF Document Reader', description: 'Spring AI PDF document reader. It uses Apache PdfBox to extract text from PDF documents and converting them into a list of Spring AI Document objects.', category: 'AI' },
    { id: 'timefold-solver', name: 'Timefold Solver', description: 'AI solver to optimize operations and scheduling.', category: 'AI' },
];
