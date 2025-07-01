const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

// Import route modules
const usuarioRoutes = require("./routes/usuarioRoutes")
const personaRoutes = require("./routes/personaRoutes")
const lineaInvestigacionRoutes = require("./routes/lineaInvestigacionRoutes")
const publicacionRoutes = require("./routes/publicacionRoutes")
const proyectoRoutes = require("./routes/proyectoRoutes")
const lineaExtensionRoutes = require("./routes/lineaExtensionRoutes")
const novedadRoutes = require("./routes/novedadRoutes")
const extensionRoutes = require("./routes/extensionRoutes")
const investigacionRoutes = require("./routes/investigacionRoutes")
const objetivoRoutes = require("./routes/objetivoRoutes")
const contenidoPresentacionRoutes = require("./routes/contenidoPresentacionRoutes")
const tarjetaFlotanteRoutes = require("./routes/tarjetaFlotanteRoutes")
const contenidoHomeRoutes = require("./routes/contenidoHomeRoutes")
const contenidoNovedadesRoutes = require("./routes/contenidoNovedadesRoutes")
const contenidoPublicacionesRoutes = require("./routes/contenidoPublicacionesRoutes")
const contenidoExtensionRoutes = require("./routes/contenidoExtensionRoutes")
const contenidoEquipoRoutes = require("./routes/contenidoEquipoRoutes")
const contenidoGaleriaRoutes = require("./routes/contenidoGaleriaRoutes")

const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Routes
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/personas", personaRoutes)
app.use("/api/lineas-investigacion", lineaInvestigacionRoutes)
app.use("/api/publicaciones", publicacionRoutes)
app.use("/api/proyectos", proyectoRoutes)
app.use("/api/lineas-extension", lineaExtensionRoutes)
app.use("/api/novedades", novedadRoutes)
app.use("/api/extensiones", extensionRoutes)
app.use("/api/investigaciones", investigacionRoutes)
app.use("/api/objetivos", objetivoRoutes)
app.use("/api/contenido-presentacion", contenidoPresentacionRoutes)
app.use("/api/tarjetas-flotantes", tarjetaFlotanteRoutes)
app.use("/api/contenido-home", contenidoHomeRoutes)
app.use("/api/contenido-novedades", contenidoNovedadesRoutes)
app.use("/api/contenido-publicaciones", contenidoPublicacionesRoutes)
app.use("/api/contenido-extension", contenidoExtensionRoutes)
app.use("/api/contenido-equipo", contenidoEquipoRoutes)
app.use("/api/contenido-galeria", contenidoGaleriaRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
  })
})


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  })
})

module.exports = app
