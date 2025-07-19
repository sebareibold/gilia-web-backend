const express = require("express")
const router = express.Router()
const ExtensionManager = require("../managers/ExtensionManager")

// GET /api/extensiones - Obtener todas
router.get("/", async (req, res) => {
  try {
    const extensiones = await ExtensionManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, extensiones })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/extensiones/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const extension = await ExtensionManager.obtenerPorId(req, res)
    if (!extension) {
      return res.status(404).json({ success: false, error: "Extensión no encontrada" })
    }
    res.status(200).json({ success: true, extension })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/extensiones - Crear
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (descripcion !== undefined && typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción debe ser string si se provee" })
  }
  try {
    const extension = await ExtensionManager.crear(req, res)
    res.status(201).json({ success: true, extension })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/extensiones/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (descripcion !== undefined && typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción debe ser string si se provee" })
  }
  try {
    const extension = await ExtensionManager.actualizar(req, res)
    res.status(200).json({ success: true, extension })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/extensiones/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await ExtensionManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

module.exports = router
