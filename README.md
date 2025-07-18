# GILIA Web Backend

API RESTful para la gestión de información del Grupo de Investigación en Lenguaje e Inteligencia Artificial (GILIA).

## Tecnologías
- Node.js + Express.js
- PostgreSQL (único almacenamiento)
- Sequelize ORM
- JavaScript

## Estructura
- `src/routes/`: Endpoints de la API
- `src/managers/`: Lógica de negocio por entidad
- `src/models/`: Modelos de datos (Sequelize)
- `src/config/`: Configuración y conexión a la base de datos
- `src/utils/`: Utilidades y helpers
- `src/middleware/`: Middlewares de seguridad y validación

## Instalación Rápida
1. Clona el repo y entra a la carpeta:
   ```bash
   git clone ...
   cd gilia-web-backend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura tu `.env` con la URL de tu base de datos PostgreSQL:
   ```env
   DATABASE_URL=postgresql://usuario:password@host:puerto/basededatos
   JWT_SECRET=tu-clave-secreta
   NODE_ENV=development
   PORT=8080
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   # o
   npm start
   ```

## Endpoints Principales
- Autenticación: `POST /api/usuarios/login`
- Usuarios: `GET/POST/PUT/DELETE /api/usuarios`
- Personas: `GET/POST/PUT/DELETE /api/personas`
- Publicaciones: `GET/POST/PUT/DELETE /api/publicaciones`
- Proyectos: `GET/POST/PUT/DELETE /api/proyectos`
- Novedades: `GET/POST/PUT/DELETE /api/novedades`
- Herramientas: `GET/POST/PUT/DELETE /api/herramientas`
- Líneas de Investigación/Extensión: `GET/POST/PUT/DELETE /api/lineas-investigacion`, `/api/lineas-extension`
- Objetivos: `GET/POST/PUT/DELETE /api/objetivos`
- Sección Galería: `GET/POST/PUT/DELETE /api/seccion-galeria`

## Seguridad
- Autenticación JWT
- Roles de usuario
- Validación y sanitización de datos
- Helmet, CORS, Rate Limiting

## Notas
- **No hay soporte para archivos JSON ni modo dual.**
- Toda la persistencia es en PostgreSQL vía Sequelize.
- El código está organizado para facilitar la extensión y el mantenimiento.

---

¿Dudas? Consulta el código o abre un issue.

