console.log('INICIO lineaExtensionRoutes.js')
const express = require("express")
const router = express.Router()
const LineaExtensionManager = require("../managers/LineaExtensionManager")

// GET /api/lineas-extension - Obtener todas
router.get("/", async (req, res) => {
  try {
    const lineas = await LineaExtensionManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, lineas })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/lineas-extension/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const linea = await LineaExtensionManager.obtenerPorId(req, res)
    if (!linea) {
      return res.status(404).json({ success: false, error: "Línea de extensión no encontrada" })
    }
    res.status(200).json({ success: true, linea })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/lineas-extension - Crear
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (descripcion !== undefined && typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción debe ser string si se provee" })
  }
  try {
    const linea = await LineaExtensionManager.crear(req, res)
    res.status(201).json({ success: true, linea })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/lineas-extension/:id - Actualizar
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
    const linea = await LineaExtensionManager.actualizar(req, res)
    res.status(200).json({ success: true, linea })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/lineas-extension/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await LineaExtensionManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// Publicaciones asociadas
router.get('/:id/publicaciones', LineaExtensionManager.obtenerPublicaciones)
router.post('/:id/publicaciones', LineaExtensionManager.agregarPublicacion)
router.delete('/:id/publicaciones/:publicacionId', LineaExtensionManager.quitarPublicacion)

// Proyectos asociados
router.get('/:id/proyectos', LineaExtensionManager.obtenerProyectos)
router.post('/:id/proyectos', LineaExtensionManager.agregarProyecto)
router.delete('/:id/proyectos/:proyectoId', LineaExtensionManager.quitarProyecto)

module.exports = router
