const express = require("express")
const router = express.Router()
const PublicacionManager = require("../managers/PublicacionManager")

// GET /api/publicaciones - Obtener todas
router.get("/", async (req, res) => {
  try {
    const publicaciones = await PublicacionManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, publicaciones })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/publicaciones/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const publicacion = await PublicacionManager.obtenerPorId(req, res)
    if (!publicacion) {
      return res.status(404).json({ success: false, error: "Publicación no encontrada" })
    }
    res.status(200).json({ success: true, publicacion })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/publicaciones - Crear
router.post("/", async (req, res) => {
  const { titulo, contenido } = req.body
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({ success: false, error: "Título es requerido y debe ser string" })
  }
  if (!contenido || typeof contenido !== "string") {
    return res.status(400).json({ success: false, error: "Contenido es requerido y debe ser string" })
  }
  try {
    const publicacion = await PublicacionManager.crear(req, res)
    res.status(201).json({ success: true, publicacion })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/publicaciones/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { titulo, contenido } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!titulo || typeof titulo !== "string") {
    return res.status(400).json({ success: false, error: "Título es requerido y debe ser string" })
  }
  if (!contenido || typeof contenido !== "string") {
    return res.status(400).json({ success: false, error: "Contenido es requerido y debe ser string" })
  }
  try {
    const publicacion = await PublicacionManager.actualizar(req, res)
    res.status(200).json({ success: true, publicacion })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/publicaciones/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await PublicacionManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// Personas asociadas
router.get('/:id/personas', PublicacionManager.obtenerPersonas)
router.post('/:id/personas', PublicacionManager.agregarPersona)
router.delete('/:id/personas/:personaId', PublicacionManager.quitarPersona)

module.exports = router
