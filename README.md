# GILIA Web Backend

API REST para el sistema de gestión del Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA) de la Universidad Nacional del Comahue.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Modelos de Datos](#modelos-de-datos)
- [Esquemas de Base de Datos](#esquemas-de-base-de-datos)
- [Uso](#uso)
- [Contribución](#contribución)

## 📖 Descripción

Este backend proporciona una API REST completa para gestionar:
- **Contenido del sitio web**: Información estática y dinámica mostrada en el frontend
- **Dominio de investigación**: Gestión de investigadores, proyectos, publicaciones y líneas de trabajo

## 🛠 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para base de datos
- **PostgreSQL** - Base de datos principal
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Helmet** - Seguridad HTTP
- **CORS** - Manejo de políticas de origen cruzado
- **Morgan** - Logging de requests

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd gilia-web-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar el servidor
npm start

# Modo desarrollo
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno

```env
# Base de datos
USE_DATABASE=true
DATABASE_URL=postgresql://user:password@host:port/database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gilia_research_db
DB_USER=postgres
DB_PASSWORD=password

# Servidor
PORT=8080
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# API
API_VERSION=1.0.0
```

## 📁 Estructura del Proyecto

```
src/
├── config/
│   ├── constants.js          # Constantes de la aplicación
│   └── database.js           # Configuración de Sequelize
├── managers/                 # Lógica de negocio (Controladores)
│   ├── ContenidoEquipoManager.js
│   ├── ContenidoExtensionManager.js
│   ├── ContenidoGaleriaManager.js
│   ├── ContenidoHomeManager.js
│   ├── ContenidoNovedadesManager.js
│   ├── ContenidoPresentacionManager.js
│   ├── ContenidoPublicacionesManager.js
│   ├── ExtensionManager.js
│   ├── HerramientaManager.js
│   ├── InvestigacionManager.js
│   ├── LineaExtensionManager.js
│   ├── LineaInvestigacionManager.js
│   ├── NovedadManager.js
│   ├── ObjetivoManager.js
│   ├── PersonaManager.js
│   ├── ProyectoManager.js
│   ├── PublicacionManager.js
│   ├── SeccionGaleriaManager.js
│   ├── TarjetaFlotanteManager.js
│   └── UsuarioManager.js
├── middleware/               # Middlewares personalizados
│   ├── errorHandler.js
│   └── validation.js
├── models/                   # Modelos de Sequelize
│   ├── ContenidoEquipo.js
│   ├── ContenidoExtension.js
│   ├── ContenidoGaleria.js
│   ├── ContenidoHome.js
│   ├── ContenidoNovedades.js
│   ├── ContenidoPresentacion.js
│   ├── ContenidoPublicaciones.js
│   ├── Extension.js
│   ├── Herramienta.js
│   ├── Investigacion.js
│   ├── LineaExtension.js
│   ├── LineaInvestigacion.js
│   ├── Novedad.js
│   ├── Objetivo.js
│   ├── Persona.js
│   ├── Proyecto.js
│   ├── Publicacion.js
│   ├── SeccionGaleria.js
│   ├── TarjetaFlotante.js
│   ├── Usuario.js
│   └── index.js
├── routes/                   # Definición de rutas
│   ├── contenidoEquipo.routes.js
│   ├── contenidoExtension.routes.js
│   ├── contenidoGaleria.routes.js
│   ├── contenidoHome.routes.js
│   ├── contenidoNovedades.routes.js
│   ├── contenidoPresentacion.routes.js
│   ├── contenidoPublicaciones.routes.js
│   ├── extension.routes.js
│   ├── herramienta.routes.js
│   ├── investigacion.routes.js
│   ├── lineaExtension.routes.js
│   ├── lineaInvestigacion.routes.js
│   ├── novedad.routes.js
│   ├── objetivo.routes.js
│   ├── persona.routes.js
│   ├── proyecto.routes.js
│   ├── publicacion.routes.js
│   ├── seccionGaleria.routes.js
│   ├── tarjetaFlotante.routes.js
│   ├── usuario.routes.js
│   └── index.js
├── utils/                    # Utilidades
│   ├── responseHelper.js
│   └── validationHelper.js
└── server.js                 # Configuración del servidor Express
```

## 🌐 API Endpoints

### 🏥 Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Estado del servidor |

### 👥 Gestión de Usuarios (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/:id` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |
| POST | `/api/usuarios/login` | Autenticar usuario |

### 👤 Gestión de Personas (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/personas` | Obtener todas las personas |
| GET | `/api/personas/:id` | Obtener persona por ID |
| POST | `/api/personas` | Crear nueva persona |
| PUT | `/api/personas/:id` | Actualizar persona |
| DELETE | `/api/personas/:id` | Eliminar persona |
| GET | `/api/personas/:id/publicaciones` | Obtener publicaciones de una persona |
| POST | `/api/personas/:id/publicaciones` | Asociar publicación a persona |
| DELETE | `/api/personas/:id/publicaciones/:publicacionId` | Desasociar publicación |

### 🔬 Líneas de Investigación (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/lineas-investigacion` | Obtener todas las líneas |
| GET | `/api/lineas-investigacion/:id` | Obtener línea por ID |
| POST | `/api/lineas-investigacion` | Crear nueva línea |
| PUT | `/api/lineas-investigacion/:id` | Actualizar línea |
| DELETE | `/api/lineas-investigacion/:id` | Eliminar línea |
| GET | `/api/lineas-investigacion/:id/publicaciones` | Obtener publicaciones de la línea |
| POST | `/api/lineas-investigacion/:id/publicaciones` | Asociar publicación |
| DELETE | `/api/lineas-investigacion/:id/publicaciones/:publicacionId` | Desasociar publicación |
| GET | `/api/lineas-investigacion/:id/proyectos` | Obtener proyectos de la línea |
| POST | `/api/lineas-investigacion/:id/proyectos` | Asociar proyecto |
| DELETE | `/api/lineas-investigacion/:id/proyectos/:proyectoId` | Desasociar proyecto |

### 🤝 Líneas de Extensión (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/lineas-extension` | Obtener todas las líneas |
| GET | `/api/lineas-extension/:id` | Obtener línea por ID |
| POST | `/api/lineas-extension` | Crear nueva línea |
| PUT | `/api/lineas-extension/:id` | Actualizar línea |
| DELETE | `/api/lineas-extension/:id` | Eliminar línea |
| GET | `/api/lineas-extension/:id/publicaciones` | Obtener publicaciones de la línea |
| POST | `/api/lineas-extension/:id/publicaciones` | Asociar publicación |
| DELETE | `/api/lineas-extension/:id/publicaciones/:publicacionId` | Desasociar publicación |
| GET | `/api/lineas-extension/:id/proyectos` | Obtener proyectos de la línea |
| POST | `/api/lineas-extension/:id/proyectos` | Asociar proyecto |
| DELETE | `/api/lineas-extension/:id/proyectos/:proyectoId` | Desasociar proyecto |

### 📚 Publicaciones (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/publicaciones` | Obtener todas las publicaciones |
| GET | `/api/publicaciones/:id` | Obtener publicación por ID |
| POST | `/api/publicaciones` | Crear nueva publicación |
| PUT | `/api/publicaciones/:id` | Actualizar publicación |
| DELETE | `/api/publicaciones/:id` | Eliminar publicación |
| GET | `/api/publicaciones/:id/personas` | Obtener autores de la publicación |
| POST | `/api/publicaciones/:id/personas` | Asociar autor |
| DELETE | `/api/publicaciones/:id/personas/:personaId` | Desasociar autor |

### 📋 Proyectos (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/proyectos` | Obtener todos los proyectos |
| GET | `/api/proyectos/:id` | Obtener proyecto por ID |
| POST | `/api/proyectos` | Crear nuevo proyecto |
| PUT | `/api/proyectos/:id` | Actualizar proyecto |
| DELETE | `/api/proyectos/:id` | Eliminar proyecto |
| GET | `/api/proyectos/:id/personas` | Obtener participantes del proyecto |
| POST | `/api/proyectos/:id/personas` | Asociar participante |
| DELETE | `/api/proyectos/:id/personas/:personaId` | Desasociar participante |
| GET | `/api/proyectos/:id/lineas-investigacion` | Obtener líneas de investigación |
| POST | `/api/proyectos/:id/lineas-investigacion` | Asociar línea de investigación |
| DELETE | `/api/proyectos/:id/lineas-investigacion/:lineaId` | Desasociar línea |
| GET | `/api/proyectos/:id/lineas-extension` | Obtener líneas de extensión |
| POST | `/api/proyectos/:id/lineas-extension` | Asociar línea de extensión |
| DELETE | `/api/proyectos/:id/lineas-extension/:lineaId` | Desasociar línea |

### 🛠 Herramientas (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/herramientas` | Obtener todas las herramientas |
| GET | `/api/herramientas/:id` | Obtener herramienta por ID |
| POST | `/api/herramientas` | Crear nueva herramienta |
| PUT | `/api/herramientas/:id` | Actualizar herramienta |
| DELETE | `/api/herramientas/:id` | Eliminar herramienta |

### 📰 Novedades (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/novedades` | Obtener todas las novedades |
| GET | `/api/novedades/:id` | Obtener novedad por ID |
| POST | `/api/novedades` | Crear nueva novedad |
| PUT | `/api/novedades/:id` | Actualizar novedad |
| DELETE | `/api/novedades/:id` | Eliminar novedad |

### 🎯 Objetivos (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/objetivos` | Obtener todos los objetivos |
| GET | `/api/objetivos/:id` | Obtener objetivo por ID |
| POST | `/api/objetivos` | Crear nuevo objetivo |
| PUT | `/api/objetivos/:id` | Actualizar objetivo |
| DELETE | `/api/objetivos/:id` | Eliminar objetivo |

### 🔬 Investigaciones (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/investigaciones` | Obtener todas las investigaciones |
| GET | `/api/investigaciones/:id` | Obtener investigación por ID |
| POST | `/api/investigaciones` | Crear nueva investigación |
| PUT | `/api/investigaciones/:id` | Actualizar investigación |
| DELETE | `/api/investigaciones/:id` | Eliminar investigación |

### 🤝 Extensiones (Dominio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/extensiones` | Obtener todas las extensiones |
| GET | `/api/extensiones/:id` | Obtener extensión por ID |
| POST | `/api/extensiones` | Crear nueva extensión |
| PUT | `/api/extensiones/:id` | Actualizar extensión |
| DELETE | `/api/extensiones/:id` | Eliminar extensión |

---

## 🎨 Contenido del Sitio Web

### 🏠 Contenido Home (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contenido-home` | Obtener contenido de la página principal |
| GET | `/api/contenido-home/:id` | Obtener contenido específico |
| POST | `/api/contenido-home` | Crear nuevo contenido |
| PUT | `/api/contenido-home/:id` | Actualizar contenido |
| DELETE | `/api/contenido-home/:id` | Eliminar contenido |

### 🎭 Contenido Presentación (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contenido-presentacion` | Obtener contenido de presentación |
| GET | `/api/contenido-presentacion/:id` | Obtener contenido específico |
| POST | `/api/contenido-presentacion` | Crear nuevo contenido |
| PUT | `/api/contenido-presentacion/:id` | Actualizar contenido |
| DELETE | `/api/contenido-presentacion/:id` | Eliminar contenido |

### 🏷 Tarjetas Flotantes (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tarjetas-flotantes` | Obtener todas las tarjetas |
| GET | `/api/tarjetas-flotantes/:id` | Obtener tarjeta por ID |
| POST | `/api/tarjetas-flotantes` | Crear nueva tarjeta |
| PUT | `/api/tarjetas-flotantes/:id` | Actualizar tarjeta |
| DELETE | `/api/tarjetas-flotantes/:id` | Eliminar tarjeta |

### 📰 Contenido Novedades (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contenido-novedades` | Obtener contenido de novedades |
| GET | `/api/contenido-novedades/:id` | Obtener contenido específico |
| POST | `/api/contenido-novedades` | Crear nuevo contenido |
| PUT | `/api/contenido-novedades/:id` | Actualizar contenido |
| DELETE | `/api/contenido-novedades/:id` | Eliminar contenido |

### 📚 Contenido Publicaciones (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contenido-publicaciones` | Obtener contenido de publicaciones |
| GET | `/api/contenido-publicaciones/:id` | Obtener contenido específico |
| POST | `/api/contenido-publicaciones` | Crear nuevo contenido |
| PUT | `/api/contenido-publicaciones/:id` | Actualizar contenido |
| DELETE | `/api/contenido-publicaciones/:id` | Eliminar contenido |

### 🤝 Contenido Extensión (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contenido-extension` | Obtener contenido de extensión |
| GET | `/api/contenido-extension/:id` | Obtener contenido específico |
| POST | `/api/contenido-extension` | Crear nuevo contenido |
| PUT | `/api/contenido-extension/:id` | Actualizar contenido |
| DELETE | `/api/contenido-extension/:id` | Eliminar contenido |

### 👥 Contenido Equipo (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contenido-equipo` | Obtener contenido del equipo |
| GET | `/api/contenido-equipo/:id` | Obtener contenido específico |
| POST | `/api/contenido-equipo` | Crear nuevo contenido |
| PUT | `/api/contenido-equipo/:id` | Actualizar contenido |
| DELETE | `/api/contenido-equipo/:id` | Eliminar contenido |

### 🖼 Contenido Galería (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contenido-galeria` | Obtener contenido de galería |
| GET | `/api/contenido-galeria/:id` | Obtener contenido específico |
| POST | `/api/contenido-galeria` | Crear nuevo contenido |
| PUT | `/api/contenido-galeria/:id` | Actualizar contenido |
| DELETE | `/api/contenido-galeria/:id` | Eliminar contenido |

### 🖼 Secciones de Galería (Sitio)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/seccion-galeria` | Obtener todas las secciones |
| GET | `/api/seccion-galeria/:id` | Obtener sección por ID |
| POST | `/api/seccion-galeria` | Crear nueva sección |
| PUT | `/api/seccion-galeria/:id` | Actualizar sección |
| DELETE | `/api/seccion-galeria/:id` | Eliminar sección |

## 📊 Modelos de Datos

### 🏢 Modelos del Dominio

#### Usuario
```javascript
{
  id: Integer (PK),
  email: String (Unique),
  password: String (Hashed),
  rol: Enum ['admin', 'investigador', 'editor', 'usuario'],
  activo: Boolean
}
```

#### Persona
```javascript
{
  id: Integer (PK),
  nombre: String,
  apellido: String,
  email_contacto: String,
  link_linkedin: String,
  link_github: String,
  especialidades: Array[String],
  usuario_id: Integer (FK)
}
```

#### LineaInvestigacion
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  imagenes: Array[String],
  activo: Boolean
}
```

#### LineaExtension
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  imagenes: Array[String],
  activo: Boolean
}
```

#### Publicacion
```javascript
{
  id: Integer (PK),
  titulo: String,
  fecha: Date,
  link: String,
  informacion: Text,
  linea_investigacion_id: Integer (FK),
  linea_extension_id: Integer (FK)
}
```

#### Proyecto
```javascript
{
  id: Integer (PK),
  nombre: String,
  descripcion: Text,
  fecha: Date,
  activo: Boolean
}
```

#### Herramienta
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  link: String,
  activo: Boolean
}
```

#### Novedad
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  link: String,
  imagen: String,
  fecha: Date,
  activo: Boolean
}
```

#### Objetivo
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  icono: String,
  orden: Integer,
  activo: Boolean
}
```

### 🎨 Modelos de Contenido del Sitio

#### ContenidoHome
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  activo: Boolean
}
```

#### ContenidoPresentacion
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  texto_boton_1: String,
  texto_boton_2: String,
  activo: Boolean
}
```

#### TarjetaFlotante
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion_corta: String,
  orden: Integer,
  activo: Boolean
}
```

#### ContenidoNovedades
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  palabras_magicas: Array[String],
  activo: Boolean
}
```

#### SeccionGaleria
```javascript
{
  id: Integer (PK),
  titulo: String,
  descripcion: Text,
  fotos: Array[String],
  orden: Integer,
  activo: Boolean
}
```

## 🗄 Esquemas de Base de Datos

### Tablas Principales del Dominio
- `usuarios` - Gestión de usuarios del sistema
- `personas` - Información de investigadores y colaboradores
- `lineas_investigacion` - Líneas de investigación del grupo
- `lineas_extension` - Líneas de extensión universitaria
- `publicaciones` - Publicaciones científicas
- `proyectos` - Proyectos de investigación y extensión
- `herramientas` - Herramientas desarrolladas
- `novedades` - Noticias y novedades
- `objetivos` - Objetivos del grupo

### Tablas de Contenido del Sitio
- `contenido_home` - Contenido de la página principal
- `contenido_presentacion` - Contenido de presentación
- `tarjetas_flotantes` - Tarjetas informativas
- `contenido_novedades` - Contenido de la sección novedades
- `contenido_publicaciones` - Contenido de la sección publicaciones
- `contenido_extension` - Contenido de la sección extensión
- `contenido_equipo` - Contenido de la sección equipo
- `contenido_galeria` - Contenido de la galería
- `secciones_galeria` - Secciones específicas de la galería

### Tablas de Relación (Many-to-Many)
- `PersonaPublicacion` - Relación autores-publicaciones
- `PersonaProyecto` - Relación participantes-proyectos
- `LineaInvestigacionProyecto` - Relación líneas investigación-proyectos
- `LineaExtensionProyecto` - Relación líneas extensión-proyectos
- `HerramientaLineaInvestigacion` - Relación herramientas-líneas investigación
- `HerramientaLineaExtension` - Relación herramientas-líneas extensión

## 📝 Uso

### Ejemplo de Peticiones

#### Obtener todas las publicaciones
```bash
curl -X GET http://localhost:8080/api/publicaciones
```

#### Crear una nueva persona
```bash
curl -X POST http://localhost:8080/api/personas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email_contacto": "juan.perez@uncoma.edu.ar",
    "especialidades": ["Machine Learning", "NLP"]
  }'
```

#### Autenticar usuario
```bash
curl -X POST http://localhost:8080/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gilia.com",
    "password": "password123"
  }'
```


## 👥 Equipo

- **Sebastian Alejandro Reibold** 
- **Cristopher Ovaillos** 


---

**Nota**: Este README proporciona una visión completa de la API. Para más detalles sobre implementación específica, consulta la documentación en el código fuente.
