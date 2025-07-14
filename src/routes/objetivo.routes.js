console.log('INICIO objetivoRoutes.js')
const express = require("express")
const router = express.Router()
const ObjetivoManager = require("../managers/ObjetivoManager")

// GET /api/objetivos - Obtener todos
router.get("/", async (req, res) => {
  try {
    const objetivos = await ObjetivoManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, objetivos })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/objetivos/:id - Obtener uno
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const objetivo = await ObjetivoManager.obtenerPorId(req, res)
    if (!objetivo) {
      return res.status(404).json({ success: false, error: "Objetivo no encontrado" })
    }
    res.status(200).json({ success: true, objetivo })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/objetivos - Crear
router.post("/", async (req, res) => {
  const { descripcion } = req.body
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const objetivo = await ObjetivoManager.crear(req, res)
    res.status(201).json({ success: true, objetivo })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/objetivos/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { descripcion } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const objetivo = await ObjetivoManager.actualizar(req, res)
    res.status(200).json({ success: true, objetivo })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/objetivos/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await ObjetivoManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
