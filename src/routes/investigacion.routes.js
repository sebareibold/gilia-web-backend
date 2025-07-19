const express = require("express")
const router = express.Router()
const InvestigacionManager = require("../managers/InvestigacionManager")

// GET /api/investigaciones - Obtener todas
router.get("/", async (req, res) => {
  try {
    const investigaciones = await InvestigacionManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, investigaciones })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/investigaciones/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const investigacion = await InvestigacionManager.obtenerPorId(req, res)
    if (!investigacion) {
      return res.status(404).json({ success: false, error: "Investigación no encontrada" })
    }
    res.status(200).json({ success: true, investigacion })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/investigaciones - Crear
router.post("/", async (req, res) => {
  const { titulo, descripcion } = req.body
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({ success: false, error: "Título es requerido y debe ser string" })
  }
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const investigacion = await InvestigacionManager.crear(req, res)
    res.status(201).json({ success: true, investigacion })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/investigaciones/:id - Actualizar
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
    const investigacion = await InvestigacionManager.actualizar(req, res)
    res.status(200).json({ success: true, investigacion })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/investigaciones/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await InvestigacionManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
