console.log('INICIO tarjetaFlotanteRoutes.js')
const express = require("express")
const router = express.Router()
const TarjetaFlotanteManager = require("../managers/TarjetaFlotanteManager")

// GET /api/tarjetas-flotantes - Obtener todas
router.get("/", async (req, res) => {
  try {
    const tarjetas = await TarjetaFlotanteManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, tarjetas })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/tarjetas-flotantes/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const tarjeta = await TarjetaFlotanteManager.obtenerPorId(req, res)
    if (!tarjeta) {
      return res.status(404).json({ success: false, error: "Tarjeta no encontrada" })
    }
    res.status(200).json({ success: true, tarjeta })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/tarjetas-flotantes - Crear
router.post("/", async (req, res) => {
  const { titulo, descripcion } = req.body
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({ success: false, error: "Título es requerido y debe ser string" })
  }
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const tarjeta = await TarjetaFlotanteManager.crear(req, res)
    res.status(201).json({ success: true, tarjeta })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/tarjetas-flotantes/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { titulo, descripcion } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({ success: false, error: "Título es requerido y debe ser string" })
  }
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const tarjeta = await TarjetaFlotanteManager.actualizar(req, res)
    res.status(200).json({ success: true, tarjeta })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/tarjetas-flotantes/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await TarjetaFlotanteManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
