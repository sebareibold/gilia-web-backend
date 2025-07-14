console.log('INICIO novedadRoutes.js')
const express = require("express")
const router = express.Router()
const NovedadManager = require("../managers/NovedadManager")

// GET /api/novedades - Obtener todas
router.get("/", async (req, res) => {
  try {
    const novedades = await NovedadManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, novedades })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/novedades/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const novedad = await NovedadManager.obtenerPorId(req, res)
    if (!novedad) {
      return res.status(404).json({ success: false, error: "Novedad no encontrada" })
    }
    res.status(200).json({ success: true, novedad })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/novedades - Crear
router.post("/", async (req, res) => {
  const { titulo, descripcion } = req.body
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({ success: false, error: "Título es requerido y debe ser string" })
  }
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const novedad = await NovedadManager.crear(req, res)
    res.status(201).json({ success: true, novedad })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/novedades/:id - Actualizar
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
    const novedad = await NovedadManager.actualizar(req, res)
    res.status(200).json({ success: true, novedad })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/novedades/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await NovedadManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
