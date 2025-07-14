console.log('INICIO proyectoRoutes.js')
const express = require("express")
const router = express.Router()
const ProyectoManager = require("../managers/ProyectoManager")

// GET /api/proyectos - Obtener todos
router.get("/", async (req, res) => {
  try {
    const proyectos = await ProyectoManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, proyectos })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/proyectos/:id - Obtener uno
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const proyecto = await ProyectoManager.obtenerPorId(req, res)
    if (!proyecto) {
      return res.status(404).json({ success: false, error: "Proyecto no encontrado" })
    }
    res.status(200).json({ success: true, proyecto })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/proyectos - Crear
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const proyecto = await ProyectoManager.crear(req, res)
    res.status(201).json({ success: true, proyecto })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/proyectos/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!descripcion || typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción es requerida y debe ser string" })
  }
  try {
    const proyecto = await ProyectoManager.actualizar(req, res)
    res.status(200).json({ success: true, proyecto })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/proyectos/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await ProyectoManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
