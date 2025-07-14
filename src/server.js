console.log('INICIO server.js')
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

console.log('Antes de importar rutas centralizadas')
// Import centralized routes
const apiRoutes = require("./routes")
console.log('Después de importar rutas centralizadas')

const app = express()
console.log('Express app creado')

// Middlewares de seguridad y logging
app.use(helmet())
console.log('Helmet cargado')
app.use(cors())
console.log('CORS cargado')
app.use(morgan("combined"))
console.log('Morgan cargado')

// Middlewares de parsing
app.use(express.json({ limit: "10mb" }))
console.log('express.json cargado')
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
console.log('express.urlencoded cargado')

// API Routes - Centralizado
console.log('Antes de usar /api con apiRoutes')
app.use("/api", apiRoutes)
console.log('Después de usar /api con apiRoutes')

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || "1.0.0",
  })
})
console.log('Health check endpoint cargado')

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack)

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
console.log('Middleware de manejo de errores cargado')

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  })
})
console.log('Handler 404 cargado')

module.exports = app
console.log('Fin de server.js')
