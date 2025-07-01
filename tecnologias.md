# Tecnologías Utilizadas en GILIA Backend

Este documento explica las tecnologías que usamos en el proyecto y cómo las aplicamos de manera sencilla.

## 🚀 Tecnologías Principales

### **Node.js**
- **¿Qué es?** Un entorno que nos permite ejecutar JavaScript en el servidor
- **¿Por qué lo usamos?** Nos permite crear APIs rápidas y eficientes usando el mismo lenguaje que el frontend
- **¿Cómo lo aplicamos?** Es la base de toda nuestra aplicación backend

### **Express.js**
- **¿Qué es?** Un framework web minimalista para Node.js
- **¿Por qué lo usamos?** Simplifica la creación de rutas, middleware y manejo de peticiones HTTP
- **¿Cómo lo aplicamos?** Definimos todas nuestras rutas de API (`/api/usuarios`, `/api/novedades`, etc.)

### **Sequelize**
- **¿Qué es?** Un ORM (Object-Relational Mapping) para bases de datos SQL
- **¿Por qué lo usamos?** Nos permite trabajar con bases de datos usando JavaScript en lugar de SQL puro
- **¿Cómo lo aplicamos?** Definimos modelos de datos y relaciones entre tablas de forma sencilla

### **PostgreSQL**
- **¿Qué es?** Una base de datos relacional robusta y confiable
- **¿Por qué lo usamos?** Perfecta para almacenar datos estructurados con relaciones complejas
- **¿Cómo lo aplicamos?** Almacenamos usuarios, publicaciones, investigaciones y todo el contenido del sitio

## 🔧 Herramientas de Desarrollo

### **bcryptjs**
- **¿Qué es?** Una librería para encriptar contraseñas
- **¿Por qué lo usamos?** Nunca almacenamos contraseñas en texto plano por seguridad
- **¿Cómo lo aplicamos?** Encriptamos las contraseñas antes de guardarlas en la base de datos

### **jsonwebtoken (JWT)**
- **¿Qué es?** Un estándar para crear tokens de autenticación
- **¿Por qué lo usamos?** Permite que los usuarios se mantengan autenticados sin enviar credenciales en cada petición
- **¿Cómo lo aplicamos?** Generamos tokens cuando el usuario hace login y los validamos en rutas protegidas

### **CORS**
- **¿Qué es?** Cross-Origin Resource Sharing - permite que el frontend se comunique con el backend
- **¿Por qué lo usamos?** Sin esto, los navegadores bloquearían las peticiones del frontend al backend
- **¿Cómo lo aplicamos?** Configuramos qué dominios pueden acceder a nuestra API

### **Helmet**
- **¿Qué es?** Un middleware de seguridad para Express
- **¿Por qué lo usamos?** Añade headers de seguridad automáticamente
- **¿Cómo lo aplicamos?** Protege contra ataques comunes como XSS, clickjacking, etc.

### **Morgan**
- **¿Qué es?** Un logger de peticiones HTTP
- **¿Por qué lo usamos?** Nos ayuda a monitorear qué peticiones llegan al servidor
- **¿Cómo lo aplicamos?** Registra automáticamente todas las peticiones con detalles útiles

## 📁 Almacenamiento Dual

### **Modo JSON (Desarrollo)**
- **¿Qué es?** Almacenamos datos en archivos JSON simples
- **¿Por qué lo usamos?** Perfecto para desarrollo rápido sin configurar base de datos
- **¿Cómo lo aplicamos?** Todos los datos se guardan en `src/database/db.json`

### **Modo Base de Datos (Producción)**
- **¿Qué es?** Usamos PostgreSQL para almacenamiento persistente
- **¿Por qué lo usamos?** Más robusto, escalable y confiable para producción
- **¿Cómo lo aplicamos?** Configuramos con la variable `USE_DATABASE=true`

## 🏗️ Patrones de Arquitectura

### **Repository Pattern**
- **¿Qué es?** Separamos la lógica de acceso a datos del resto de la aplicación
- **¿Por qué lo usamos?** Podemos cambiar entre JSON y base de datos sin afectar el resto del código
- **¿Cómo lo aplicamos?** Tenemos `JsonRepository` y `SequelizeRepository` con la misma interfaz

### **Factory Pattern**
- **¿Qué es?** Un patrón que crea objetos sin especificar su clase exacta
- **¿Por qué lo usamos?** Decide automáticamente si usar JSON o base de datos según la configuración
- **¿Cómo lo aplicamos?** `RepositoryFactory` crea el repositorio correcto automáticamente

### **Service Layer**
- **¿Qué es?** Una capa que contiene la lógica de negocio
- **¿Por qué lo usamos?** Separa la lógica de negocio de los controladores y repositorios
- **¿Cómo lo aplicamos?** `BaseService` maneja operaciones comunes como crear, leer, actualizar, eliminar

### **Manager Pattern (Controllers)**
- **¿Qué es?** Controladores que manejan las peticiones HTTP
- **¿Por qué lo usamos?** Organizan y procesan las peticiones antes de enviar respuestas
- **¿Cómo lo aplicamos?** Cada entidad tiene su manager (`UsuarioManager`, `NovedadManager`, etc.)

## 🛡️ Seguridad

### **Validación de Datos**
- **¿Qué hacemos?** Verificamos que los datos recibidos sean correctos
- **¿Por qué es importante?** Previene errores y ataques maliciosos
- **¿Cómo lo aplicamos?** `ValidationHelper` valida emails, URLs, campos requeridos, etc.

### **Sanitización**
- **¿Qué hacemos?** Limpiamos los datos de entrada
- **¿Por qué es importante?** Previene inyección de código malicioso
- **¿Cómo lo aplicamos?** Eliminamos espacios extra y caracteres peligrosos

### **Manejo de Errores**
- **¿Qué hacemos?** Capturamos y procesamos errores de forma segura
- **¿Por qué es importante?** Evita que la aplicación se rompa y no expone información sensible
- **¿Cómo lo aplicamos?** `ResponseHelper` estandariza todas las respuestas de error

## 🔄 Variables de Entorno

### **Configuración Flexible**
- **¿Qué son?** Variables que cambian según el entorno (desarrollo, producción)
- **¿Por qué las usamos?** Permiten configurar la aplicación sin cambiar código
- **¿Cómo las aplicamos?** 
  - `USE_DATABASE`: Decide si usar JSON o base de datos
  - `JWT_SECRET`: Clave secreta para tokens
  - `DB_HOST`, `DB_PORT`: Configuración de base de datos
  - `PORT`: Puerto donde corre el servidor

## 📦 Gestión de Dependencias

### **npm (Node Package Manager)**
- **¿Qué es?** El gestor de paquetes de Node.js
- **¿Por qué lo usamos?** Instala y maneja todas las librerías que necesitamos
- **¿Cómo lo aplicamos?** `package.json` lista todas nuestras dependencias

### **Scripts de npm**
- **¿Qué son?** Comandos predefinidos para tareas comunes
- **¿Por qué los usamos?** Simplifican el desarrollo y despliegue
- **¿Cómo los aplicamos?**
  - `npm start`: Inicia el servidor
  - `npm run dev`: Inicia con recarga automática
  - `npm test`: Ejecuta pruebas

## 🌐 API RESTful

### **Principios REST**
- **¿Qué es?** Un estilo de arquitectura para APIs web
- **¿Por qué lo usamos?** Estándar de la industria, fácil de entender y usar
- **¿Cómo lo aplicamos?**
  - `GET /api/usuarios`: Obtener usuarios
  - `POST /api/usuarios`: Crear usuario
  - `PUT /api/usuarios/:id`: Actualizar usuario
  - `DELETE /api/usuarios/:id`: Eliminar usuario

### **Códigos de Estado HTTP**
- **¿Qué son?** Números que indican el resultado de una petición
- **¿Por qué los usamos?** Comunicación clara entre frontend y backend
- **¿Cómo los aplicamos?**
  - `200`: Éxito
  - `201`: Creado
  - `400`: Error del cliente
  - `404`: No encontrado
  - `500`: Error del servidor

## 🚀 Despliegue y Producción

### **Detección Automática de Puerto**
- **¿Qué hace?** Encuentra un puerto disponible automáticamente
- **¿Por qué es útil?** Evita conflictos cuando el puerto preferido está ocupado
- **¿Cómo funciona?** Intenta el puerto configurado, si no está disponible, busca el siguiente

### **Cierre Graceful**
- **¿Qué es?** Cerrar la aplicación de forma ordenada
- **¿Por qué es importante?** Evita pérdida de datos y conexiones colgadas
- **¿Cómo funciona?** Escucha señales del sistema y cierra conexiones antes de terminar

Esta arquitectura nos permite tener un backend robusto, escalable y fácil de mantener, perfecto para el sitio web del grupo de investigación GILIA.

