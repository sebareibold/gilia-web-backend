# 🎓 G.I.L.I.A Backend

![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-333333?style=for-the-badge)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

Backend API profesional para el **Sistema de gestión del Grupo de Investigación en Líneas de Investigación y Aplicaciones (G.I.L.I.A)**. La API está diseñada con una arquitectura modular para asegurar un código limpio, fácil de mantener y escalar, utilizando **SQLite** para una configuración de desarrollo local simplificada.

## ¿Cómo se presenta la solución?

La solución sigue la arquitectura estándar de NestJS, donde cada parte del sistema tiene una responsabilidad definida para manejar las peticiones de la API.

El flujo de trabajo es el siguiente:

1.  **Módulos:** La aplicación se organiza en módulos (`AppModule`, `UsersModule`, etc.), que encapsulan un dominio de la aplicación.
2.  **Controladores:** Cada solicitud (ej. `GET /api/v1/novedades`) es recibida por un controlador que la dirige al servicio correspondiente.
3.  **Servicios:** Los servicios contienen la lógica de negocio principal (CRUD) y se comunican con la capa de datos (el repositorio de TypeORM).
4.  **Entidades y Repositorios:** Las entidades, definidas con TypeORM, son la capa de datos que interactúa con la base de datos SQLite. Proporcionan una interfaz para consultar, crear y actualizar los registros.

## Tecnologías utilizadas

*   **Node.js** (v18+)
*   **NestJS** (framework base para la API)
*   **TypeScript** (tipado estático para un código más robusto)
*   **SQLite** (base de datos SQL en un único fichero)
*   **TypeORM** (ORM para interactuar con la base de datos)
*   **Dotenv** (gestión de variables de entorno)

## Estructura del proyecto

```
src/
├── modules/
│   ├── usuarios/        #  Gestión de usuarios
│   ├── configuracion/   #  Configuraciones del sistema
│   ├── novedades/       #  Noticias y actualizaciones
│   ├── personas/        #  Investigadores y personal
│   ├── publicaciones/   #  Papers académicos
│   ├── noticias/        #  Anuncios temporales
│   └── contenido/       #  Contenido estático del sitio
├── common/
│   └── entities/        # Entidad base con campos de auditoría
├── app.module.ts      # Módulo raíz de la aplicación
└── main.ts            # Punto de entrada de la aplicación
```


## Observacion de desarrollo

Este proyecto backend se encuentra en desarrollo dentro del marco de la Beca PPU de la UNCO FAI. La implementación actual se está realizando de manera progresiva, lo que permite familiarizarnos con el framework NestJS y consolidar buenas prácticas de desarrollo de APIs. Debido a esto, la estructura y funcionalidades pueden experimentar cambios significativos a medida que avanzamos en el aprendizaje y la evolución del proyecto.

---

