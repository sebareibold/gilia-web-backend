# GILIA Web Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ¿Qué es este proyecto?

GILIA Web Backend es la API RESTful que gestiona toda la información del sitio web del Grupo de Investigación en Lenguaje e Inteligencia Artificial (GILIA). Permite administrar investigaciones, publicaciones, equipo, noticias, extensiones y más, con seguridad y flexibilidad para desarrollo y producción.

- **API RESTful** para todas las entidades principales.
- **Almacenamiento dual**: elige entre archivos JSON (desarrollo) o PostgreSQL (producción).
- **Seguridad**: autenticación JWT, roles, validación y encriptación de contraseñas.
- **Arquitectura escalable**: patrones Repository, Factory, Service y Manager.
- **Configuración flexible** mediante variables de entorno.

---

## 🚀 Tecnologías Principales

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework web minimalista para crear APIs rápidas y robustas.
- **Sequelize**: ORM para trabajar con bases de datos SQL usando JavaScript.
- **PostgreSQL**: Base de datos relacional robusta y confiable.
- **JavaScript**: Lenguaje principal del backend.

## 🏗️ Arquitectura y Carpetas Principales

- **src/routes/**: Define todos los endpoints de la API.
- **src/managers/**: Controladores (Managers) que procesan la lógica de cada entidad.
- **src/service/**: Lógica de negocio y servicios reutilizables.
- **src/repositories/**: Acceso a datos, tanto para JSON como para PostgreSQL.
- **src/models/**: Definición de entidades y modelos de datos.
- **src/database/**: Persistencia de datos (archivos JSON y helpers de base de datos).
- **src/config/**: Configuración general y de base de datos.
- **src/utils/**: Helpers y utilidades comunes.
- **src/milddleware/**: Middlewares para validación y manejo de errores.

## 📦 Principales Características

- **Almacenamiento dual**: modo desarrollo (JSON) y modo producción (PostgreSQL).
- **Autenticación JWT** y roles de usuario.
- **Validación y sanitización** de datos de entrada.
- **Gestión completa** de usuarios, publicaciones, proyectos, equipo, novedades, objetivos, líneas de investigación y más.
- **Configuración por variables de entorno** para fácil despliegue.

---

## 📋 Descripción

Este proyecto proporciona una API RESTful completa para gestionar el contenido del sitio web de GILIA, incluyendo investigaciones, publicaciones, noticias, equipo de trabajo y contenido dinámico de las diferentes secciones del sitio.

### Características Principales

- **🔄 Almacenamiento Dual**: Soporte para desarrollo con JSON y producción con PostgreSQL
- **🛡️ Seguridad Robusta**: Autenticación JWT, encriptación de contraseñas, validación de datos
- **🏗️ Arquitectura Limpia**: Implementa patrones Repository, Factory, Service Layer y Manager
- **📱 API RESTful**: Endpoints bien estructurados siguiendo estándares REST
- **🔧 Configuración Flexible**: Variables de entorno para diferentes ambientes
- **📊 Gestión Completa**: CRUD completo para todas las entidades del sistema

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL >= 12 (opcional, para modo base de datos)

### Instalación

1. **Clonar el repositorio**
   ```shell
   git clone https://github.com/sebareibold/gilia-web-backend.git
   cd gilia-web-backend
   ```

2. **Instalar dependencias**
   ```shell
   npm install
   ```

3. **Configurar variables de entorno**
   ```shell
   cp .env.example .env
   # Editar .env con tu configuración
   ```

4. **Iniciar el servidor**
   ```shell
   npm run dev
   
   # Modo producción
   npm start
   ```

### Configuración Rápida (Modo JSON)

```env
USE_DATABASE=false
PORT=8080
JWT_SECRET=tu-clave-secreta-aqui
```

## 🏗️ Arquitectura

### Principios de Diseño

1. **Separación de Responsabilidades**: Cada capa tiene una función específica
2. **Inversión de Dependencias**: Las capas superiores no dependen de las inferiores
3. **Principio Abierto/Cerrado**: Extensible sin modificar código existente
4. **Responsabilidad Única**: Cada clase tiene una sola razón para cambiar

### Estructura de Capas

```
┌─────────────────────────────────────┐
│           Capa de Presentación      │
│         (Managers/Controllers)      │
├─────────────────────────────────────┤
│           Capa de Servicios         │
│            (BaseService)            │
├─────────────────────────────────────┤
│         Capa de Repositorios        │
│    (JsonRepository/SequelizeRepo)   │
├─────────────────────────────────────┤
│         Capa de Persistencia        │
│        (JSON Files/PostgreSQL)      │
└─────────────────────────────────────┘
```

### Patrones Implementados

- **Repository Pattern**: Abstrae el acceso a datos, nos permite elegir si utilizar el json o bien la BD de PostgreSQL (Algo que todavia no esta implementado)
- **Factory Pattern**: Crea repositorios según configuración
- **Service Layer Pattern**: Contiene lógica de negocio
- **Manager Pattern**: Maneja peticiones HTTP
- **Helper Pattern**: Utilidades reutilizables

## 📊 Entidades del Sistema

### Entidades Principales
- **Usuarios**: Sistema de autenticación y roles
- **Personas**: Miembros del equipo de investigación
- **Investigaciones**: Proyectos de investigación
- **Publicaciones**: Papers, artículos, libros
- **Novedades**: Noticias y anuncios
- **Extensiones**: Proyectos de extensión universitaria

### Entidades de Contenido
- **Contenido Home**: Página principal
- **Contenido Presentación**: Sección "Acerca de"
- **Contenido Publicaciones**: Página de publicaciones
- **Contenido Extensión**: Página de extensión
- **Contenido Equipo**: Página del equipo
- **Contenido Galería**: Galería de imágenes

### Entidades de Configuración
- **Objetivos**: Objetivos del grupo
- **Líneas de Investigación**: Áreas de investigación
- **Líneas de Extensión**: Áreas de extensión
- **Secciones Galería**: Organización de la galería
- **Tarjetas Flotantes**: Elementos destacados

## 🔌 API Endpoints

### Autenticación
```
POST /api/usuarios/login          # Iniciar sesión
```

### Gestión de Usuarios
```
GET    /api/usuarios              # Listar usuarios
GET    /api/usuarios/:id          # Obtener usuario
POST   /api/usuarios              # Crear usuario
PUT    /api/usuarios/:id          # Actualizar usuario
DELETE /api/usuarios/:id          # Eliminar usuario
```

### Contenido Principal
```
GET    /api/novedades             # Listar novedades
GET    /api/investigaciones       # Listar investigaciones
GET    /api/publicaciones         # Listar publicaciones
GET    /api/personas              # Listar equipo
GET    /api/extensiones           # Listar extensiones
```

### Contenido Dinámico
```
GET    /api/contenido-home         # Contenido página principal
GET    /api/contenido-presentacion # Contenido presentación
GET    /api/objetivos              # Objetivos del grupo
GET    /api/tarjetas-flotantes     # Elementos destacados
```

### Utilidades
```
GET    /api/health               # Estado del servidor
```

## 🛡️ Seguridad

### Autenticación y Autorización
- **JWT Tokens**: Autenticación stateless
- **Roles de Usuario**: admin, investigador, editor, usuario
- **Encriptación**: bcrypt para contraseñas
- **Validación**: Sanitización de datos de entrada

### Medidas de Seguridad
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de acceso entre dominios
- **Rate Limiting**: Prevención de ataques de fuerza bruta
- **Input Validation**: Validación exhaustiva de datos

## 🔧 Configuración

### Variables de Entorno

| Variable         | Descripción                        | Valor por Defecto   |
|------------------|------------------------------------|---------------------|
| `USE_DATABASE`   | Usar PostgreSQL (true) o JSON (false) | `false`          |
| `PORT`           | Puerto del servidor                | `8080`              |
| `NODE_ENV`       | Entorno de ejecución               | `development`       |
| `DB_HOST`        | Host de PostgreSQL                 | `localhost`         |
| `DB_PORT`        | Puerto de PostgreSQL               | `5432`              |
| `DB_NAME`        | Nombre de la base de datos         | `gilia_research_db` |
| `DB_USER`        | Usuario de PostgreSQL              | `postgres`          |
| `DB_PASSWORD`    | Contraseña de PostgreSQL           | `password`          |
| `JWT_SECRET`     | Clave secreta para JWT             | `default-secret`    |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token     | `24h`               |

### Modos de Operación

#### Modo JSON (Desarrollo)
- Almacenamiento en `src/database/db.json`
- Sin configuración de base de datos
- Ideal para desarrollo rápido
- Datos se pierden al reiniciar

#### Modo Base de Datos (Producción)
- PostgreSQL como almacenamiento
- Datos persistentes
- Soporte para transacciones
- Escalable y robusto

## 🧪 Testing

```shell
# Ejecutar pruebas
npm test

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar en modo watch
npm run test:watch
```

## 📝 Desarrollo

### Scripts Disponibles

```shell
npm start          # Iniciar servidor
npm run dev        # Desarrollo con recarga automática
npm test           # Ejecutar pruebas
npm run lint       # Verificar código
npm run lint:fix   # Corregir problemas de código
```

### Estructura del Proyecto

```
src/
├── config/          # Configuración y constantes
├── database/        # Archivos JSON (modo desarrollo)
├── managers/        # Controladores (capa presentación)
├── middleware/      # Middleware de Express
├── models/          # Modelos de Sequelize
├── repositories/    # Capa de acceso a datos
├── routes/          # Definición de rutas
├── service/         # Lógica de negocio
├── utils/           # Utilidades y helpers
└── server.js        # Configuración del servidor
```

## 🚀 Despliegue

### Preparación para Producción

1. **Configurar variables de entorno**
2. **Configurar base de datos PostgreSQL**
3. **Ejecutar migraciones** (si es necesario)
4. **Configurar proxy reverso** (nginx/apache)
5. **Configurar SSL/TLS**

### Ejemplo de Despliegue con Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código

- **ESLint**: Seguir las reglas configuradas
- **Prettier**: Formateo automático de código
- **Commits**: Usar conventional commits
- **Testing**: Mantener cobertura > 80%

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado por el Grupo de Investigación en Lingüística e Inteligencia Artificial (GILIA).

## 📞 Soporte

Para reportar bugs o solicitar features, crear un issue en el repositorio.

---

**GILIA Backend** - Potenciando la investigación en Lingüística e IA 🚀

