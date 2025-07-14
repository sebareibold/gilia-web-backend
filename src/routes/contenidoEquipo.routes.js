console.log('INICIO contenidoEquipoRoutes.js')
const express = require("express")
const router = express.Router()
const ContenidoEquipoManager = require("../managers/ContenidoEquipoManager")

// GET /api/contenido-equipo - Obtener todos
router.get("/", async (req, res) => {
  try {
    const equipos = await ContenidoEquipoManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, equipos })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/contenido-equipo/:id - Obtener uno
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const equipo = await ContenidoEquipoManager.obtenerPorId(req, res)
    if (!equipo) {
      return res.status(404).json({ success: false, error: "Equipo no encontrado" })
    }
    res.status(200).json({ success: true, equipo })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/contenido-equipo - Crear
router.post("/", async (req, res) => {
  const { nombre, rol } = req.body
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!rol || typeof rol !== "string") {
    return res.status(400).json({ success: false, error: "Rol es requerido y debe ser string" })
  }
  try {
    const equipo = await ContenidoEquipoManager.crear(req, res)
    res.status(201).json({ success: true, equipo })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/contenido-equipo/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nombre, rol } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!rol || typeof rol !== "string") {
    return res.status(400).json({ success: false, error: "Rol es requerido y debe ser string" })
  }
  try {
    const equipo = await ContenidoEquipoManager.actualizar(req, res)
    res.status(200).json({ success: true, equipo })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/contenido-equipo/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await ContenidoEquipoManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
