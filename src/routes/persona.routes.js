console.log('INICIO personaRoutes.js')
const express = require("express")
const router = express.Router()
const PersonaManager = require("../managers/PersonaManager")

// GET /api/personas - Obtener todas
router.get("/", async (req, res) => {
  try {
    const personas = await PersonaManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, personas })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/personas/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const persona = await PersonaManager.obtenerPorId(req, res)
    if (!persona) {
      return res.status(404).json({ success: false, error: "Persona no encontrada" })
    }
    res.status(200).json({ success: true, persona })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/personas - Crear
router.post("/", async (req, res) => {
  const { nombre, apellido } = req.body
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!apellido || typeof apellido !== "string") {
    return res.status(400).json({ success: false, error: "Apellido es requerido y debe ser string" })
  }
  try {
    const persona = await PersonaManager.crear(req, res)
    res.status(201).json({ success: true, persona })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/personas/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nombre, apellido } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!apellido || typeof apellido !== "string") {
    return res.status(400).json({ success: false, error: "Apellido es requerido y debe ser string" })
  }
  try {
    const persona = await PersonaManager.actualizar(req, res)
    res.status(200).json({ success: true, persona })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/personas/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await PersonaManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
