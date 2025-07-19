const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

// Import centralized routes
const apiRoutes = require("./routes")

const app = express()

// Middlewares de seguridad y logging
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))

// Middlewares de parsing
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// API Routes - Centralizado
app.use("/api", apiRoutes)

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
