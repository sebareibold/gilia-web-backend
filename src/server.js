const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
// const morgan = require("morgan")
require("dotenv").config()

// Import centralized routes
const apiRoutes = require("./routes")

const app = express()

// Middlewares de seguridad y logging
app.use(helmet())
app.use(cors())
// app.use(morgan("combined"))

// Middlewares de parsing
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// API Routes - Centralizado
app.use("/api", apiRoutes)

// Endpoint de bienvenida en la raíz
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "¡Bienvenido a la API de GILIA!",
    descripcion: "API REST para el sistema de gestión del Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA) de la Universidad Nacional del Comahue.",
    rutas: [
      { path: "/api/health", descripcion: "Estado del servidor" },
      { path: "/api/usuarios", descripcion: "Gestión de usuarios" },
      { path: "/api/personas", descripcion: "Gestión de personas" },
      { path: "/api/lineas-investigacion", descripcion: "Líneas de investigación" },
      { path: "/api/lineas-extension", descripcion: "Líneas de extensión" },
      { path: "/api/publicaciones", descripcion: "Publicaciones" },
      { path: "/api/proyectos", descripcion: "Proyectos" },
      { path: "/api/novedades", descripcion: "Novedades" },
      { path: "/api/contenido-home", descripcion: "Contenido Home" },
      // Puedes agregar más rutas principales aquí
    ],
    version: process.env.API_VERSION || "1.0.0",
    documentacion: "Consulta /api/health para verificar el estado o la documentación para más detalles."
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || "1.0.0",
  })
})

// Error handling middleware
app.use((err, req, res, next) => {

  // Error de validación de Sequelize
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    })
  }

  // Error de clave duplicada
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Recurso ya existe",
      error: "Datos duplicados",
    })
  }

  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  })
})

module.exports = app
