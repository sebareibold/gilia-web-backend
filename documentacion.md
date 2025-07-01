# Documentación Técnica - GILIA Backend

## Diagramas de Arquitectura y Diseño

### 1. Diagrama de Clases del Dominio

```mermaid
classDiagram
    %% Entidades Principales del Dominio
    class Usuario {
        +Integer id
        +String email
        +String password
        +String rol
        +Boolean activo
        +validarPassword(password) Boolean
    }

    class Persona {
        +Integer id
        +String nombre
        +String apellido
        +String email_contacto
        +String link_linkedin
        +String link_github
        +Array~String~ especialidades
        +Integer usuario_id
    }

    class Investigacion {
        +Integer id
        +String titulo
        +String descripcion
        +String link
        +String imagen
        +Boolean activo
    }

    class LineaInvestigacion {
        +Integer id
        +String titulo
        +String descripcion
        +Array~String~ imagenes
        +Boolean activo
    }

    class Publicacion {
        +Integer id
        +String titulo
        +String categoria
        +Date fecha
        +Array~String~ links
        +String informacion
        +Integer persona_id
    }

    class Proyecto {
        +Integer id
        +String nombre
        +String descripcion
        +Date fecha
        +Boolean activo
    }

    class Extension {
        +Integer id
        +String titulo
        +String descripcion
        +String link
        +String imagen
        +Boolean activo
    }

    class LineaExtension {
        +Integer id
        +String nombre
        +String descripcion
        +Array~String~ imagenes
        +Boolean activo
    }

    class Novedad {
        +Integer id
        +String titulo
        +String descripcion
        +String link
        +String imagen
        +Date fecha_publicacion
        +Boolean activo
    }

    class Objetivo {
        +Integer id
        +String titulo
        +String descripcion
        +String icono
        +Integer orden
        +Boolean activo
    }

    class SeccionGaleria {
        +Integer id
        +String titulo
        +String descripcion
        +Array~String~ fotos
        +Integer orden
        +Boolean activo
    }

    %% Relaciones principales (basadas en la imagen)
    Novedad <|-- Investigacion
    Novedad <|-- Extension
    Persona <|-- Usuario
    Investigacion "1" o-- "*" LineaInvestigacion : contiene
    Extension "1" o-- "*" LineaExtension : contiene
    LineaInvestigacion "1" o-- "*" Publicacion : genera
    LineaExtension "1" o-- "*" Proyecto : desarrolla
    Publicacion "*" o-- "*" Persona : autor
    Proyecto "*" o-- "*" Persona : participa
```

### 2. Diagrama de Clases de Contenido Dinámico

```mermaid
classDiagram
    %% Entidades de Contenido de la Interfaz
    class ContenidoHome {
        +Integer id
        +String titulo
        +String descripcion
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    class ContenidoPresentacion {
        +Integer id
        +String titulo
        +String descripcion
        +String texto_boton_1
        +String texto_boton_2
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    class ContenidoNovedades {
        +Integer id
        +String titulo
        +String descripcion
        +Array~String~ palabras_magicas
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    class ContenidoPublicaciones {
        +Integer id
        +String titulo
        +String descripcion
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    class ContenidoExtension {
        +Integer id
        +String titulo
        +String descripcion
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    class ContenidoEquipo {
        +Integer id
        +String titulo
        +String descripcion
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    class ContenidoGaleria {
        +Integer id
        +String titulo
        +String descripcion
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    class TarjetaFlotante {
        +Integer id
        +String titulo
        +String descripcion_corta
        +Integer orden
        +Boolean activo
        +Date created_at
        +Date updated_at
    }

    %% Componentes de UI que gestionan el contenido
    class HomePageComponent {
        +renderHero()
        +renderObjectives()
        +renderFloatingCards()
        +renderLatestNews()
    }

    class PresentationPageComponent {
        +renderIntroduction()
        +renderMission()
        +renderVision()
        +renderActionButtons()
    }

    class NewsPageComponent {
        +renderNewsList()
        +renderFilters()
        +renderPagination()
        +renderMagicWords()
    }

    class PublicationsPageComponent {
        +renderPublicationsList()
        +renderCategoryFilter()
        +renderAuthorFilter()
        +renderDateFilter()
    }

    class TeamPageComponent {
        +renderTeamMembers()
        +renderMemberDetails()
        +renderSpecialties()
        +renderContactInfo()
    }

    class GalleryPageComponent {
        +renderGallerySections()
        +renderImageGrid()
        +renderImageModal()
        +renderSectionNavigation()
    }

    %% Relaciones entre contenido y componentes
    ContenidoHome --> HomePageComponent : "alimenta"
    ContenidoPresentacion --> PresentationPageComponent : "alimenta"
    ContenidoNovedades --> NewsPageComponent : "alimenta"
    ContenidoPublicaciones --> PublicationsPageComponent : "alimenta"
    ContenidoEquipo --> TeamPageComponent : "alimenta"
    ContenidoGaleria --> GalleryPageComponent : "alimenta"
    TarjetaFlotante --> HomePageComponent : "alimenta"
```

### 3. Diagrama de Arquitectura del Sistema

```mermaid
graph TB
    %% Capa de Presentación
    subgraph "Capa de Presentación"
        UM[UsuarioManager]
        NM[NovedadManager]
        PM[PersonaManager]
        PubM[PublicacionManager]
        IM[InvestigacionManager]
        EM[ExtensionManager]
        CM[ContenidoManagers]
    end

    %% Capa de Servicios
    subgraph "Capa de Servicios"
        BS[BaseService]
    end

    %% Capa de Repositorios
    subgraph "Capa de Repositorios"
        RF[RepositoryFactory]
        BR[BaseRepository]
        JR[JsonRepository]
        SR[SequelizeRepository]
    end

    %% Capa de Persistencia
    subgraph "Capa de Persistencia"
        JSON[(JSON Files)]
        PG[(PostgreSQL)]
    end

    %% Utilidades
    subgraph "Utilidades"
        RH[ResponseHelper]
        VH[ValidationHelper]
        CONST[Constants]
    end

    %% Middleware
    subgraph "Middleware"
        AUTH[Authentication]
        VALID[Validation]
        ERROR[ErrorHandler]
    end

    %% Flujo de datos
    UM --> BS
    NM --> BS
    PM --> BS
    PubM --> BS
    IM --> BS
    EM --> BS
    CM --> BS

    BS --> RF
    RF --> BR
    BR --> JR
    BR --> SR

    JR --> JSON
    SR --> PG

    UM --> RH
    UM --> VH
    BS --> CONST

    %% Middleware connections
    AUTH -.-> UM
    VALID -.-> NM
    ERROR -.-> BS
```

### 4. Diagrama de Flujo de Peticiones HTTP

```mermaid
sequenceDiagram
    participant Client
    participant Routes
    participant Manager
    participant Service
    participant Repository
    participant Storage

    Client->>Routes: HTTP Request
    Routes->>Manager: Route Handler

    alt Authentication Required
        Manager->>Manager: Validate JWT Token
        alt Invalid Token
            Manager-->>Client: 401 Unauthorized
        end
    end

    Manager->>Manager: Validate Input Data
    alt Invalid Data
        Manager-->>Client: 400 Bad Request
    end

    Manager->>Service: Business Logic Call
    Service->>Repository: Data Operation

    alt JSON Mode
        Repository->>Storage: Read/Write JSON File
        Storage-->>Repository: Data
    else Database Mode
        Repository->>Storage: SQL Query
        Storage-->>Repository: Result Set
    end

    Repository-->>Service: Processed Data
    Service-->>Manager: Business Result
    Manager->>Manager: Format Response
    Manager-->>Client: HTTP Response
```

### 5. Diagrama de Estados de Autenticación

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated

    Unauthenticated --> Authenticating : POST /login
    Authenticating --> Authenticated : Valid Credentials
    Authenticating --> Unauthenticated : Invalid Credentials

    Authenticated --> Authorized : Valid Token + Permissions
    Authenticated --> Unauthenticated : Token Expired
    Authenticated --> Unauthorized : Valid Token + No Permissions

    Authorized --> [*] : Logout
    Unauthorized --> [*] : Logout
    Unauthenticated --> [*] : Session End

    state Authenticating {
        [*] --> ValidatingCredentials
        ValidatingCredentials --> CheckingPassword
        CheckingPassword --> GeneratingToken : Password Valid
        CheckingPassword --> [*] : Password Invalid
        GeneratingToken --> [*]
    }

    state Authorized {
        [*] --> CanRead
        [*] --> CanWrite : Admin/Editor Role
        [*] --> CanDelete : Admin Role
        CanRead --> CanWrite : Role Upgrade
        CanWrite --> CanDelete : Role Upgrade
    }
```

### 6. Diagrama de Componentes del Sistema

```mermaid
graph LR
    %% Componentes Externos
    subgraph "Cliente"
        WEB[Web Frontend]
        MOBILE[Mobile App]
        API_CLIENT[API Client]
    end

    %% API Gateway
    subgraph "API Layer"
        EXPRESS[Express Server]
        ROUTES[Route Handlers]
        MIDDLEWARE[Middleware Stack]
    end

    %% Lógica de Negocio
    subgraph "Business Logic"
        MANAGERS[Managers Layer]
        SERVICES[Services Layer]
        VALIDATORS[Validation Layer]
    end

    %% Acceso a Datos
    subgraph "Data Access"
        REPOSITORIES[Repository Layer]
        FACTORY[Factory Pattern]
    end

    %% Almacenamiento
    subgraph "Storage"
        JSON_DB[JSON Database]
        POSTGRES[PostgreSQL]
        FILES[File System]
    end

    %% Servicios Externos
    subgraph "External Services"
        JWT_SERVICE[JWT Service]
        BCRYPT[Bcrypt Service]
        LOGGER[Logging Service]
    end

    %% Conexiones
    WEB --> EXPRESS
    MOBILE --> EXPRESS
    API_CLIENT --> EXPRESS

    EXPRESS --> ROUTES
    ROUTES --> MIDDLEWARE
    MIDDLEWARE --> MANAGERS

    MANAGERS --> SERVICES
    MANAGERS --> VALIDATORS
    SERVICES --> REPOSITORIES

    REPOSITORIES --> FACTORY
    FACTORY --> JSON_DB
    FACTORY --> POSTGRES

    MANAGERS --> JWT_SERVICE
    MANAGERS --> BCRYPT
    EXPRESS --> LOGGER

    FILES -.-> JSON_DB
```

### 7. Diagrama de Despliegue

```mermaid
graph TB
    %% Entorno de Desarrollo
    subgraph "Development Environment"
        DEV_SERVER[Development Server\nNode.js + Express]
        DEV_JSON[JSON Files\nLocal Storage]
        DEV_SERVER --> DEV_JSON
    end

    %% Entorno de Producción
    subgraph "Production Environment"
        LOAD_BALANCER[Load Balancer\nnginx/Apache]

        subgraph "Application Servers"
            APP1[App Server 1\nNode.js + Express]
            APP2[App Server 2\nNode.js + Express]
            APP3[App Server N\nNode.js + Express]
        end

        subgraph "Database Cluster"
            MASTER_DB[(Master PostgreSQL)]
            REPLICA_DB[(Replica PostgreSQL)]
        end

        subgraph "Monitoring & Logging"
            MONITOR[Monitoring\nPrometheus/Grafana]
            LOGS[Centralized Logging\nELK Stack]
        end
    end

    %% Conexiones
    LOAD_BALANCER --> APP1
    LOAD_BALANCER --> APP2
    LOAD_BALANCER --> APP3

    APP1 --> MASTER_DB
    APP2 --> MASTER_DB
    APP3 --> MASTER_DB

    MASTER_DB --> REPLICA_DB

    APP1 --> MONITOR
    APP2 --> MONITOR
    APP3 --> MONITOR

    APP1 --> LOGS
    APP2 --> LOGS
    APP3 --> LOGS
```
