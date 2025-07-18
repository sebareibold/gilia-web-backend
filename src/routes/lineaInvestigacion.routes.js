console.log('INICIO lineaInvestigacionRoutes.js')
const express = require("express")
const router = express.Router()
const LineaInvestigacionManager = require("../managers/LineaInvestigacionManager")

// GET /api/lineas-investigacion - Obtener todas
router.get("/", async (req, res) => {
  try {
    const lineas = await LineaInvestigacionManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, lineas })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/lineas-investigacion/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const linea = await LineaInvestigacionManager.obtenerPorId(req, res)
    if (!linea) {
      return res.status(404).json({ success: false, error: "Línea de investigación no encontrada" })
    }
    res.status(200).json({ success: true, linea })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/lineas-investigacion - Crear
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (descripcion !== undefined && typeof descripcion !== "string") {
    return res.status(400).json({ success: false, error: "Descripción debe ser string si se provee" })
  }
  try {
    const linea = await LineaInvestigacionManager.crear(req, res)
    res.status(201).json({ success: true, linea })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/lineas-investigacion/:id - Actualizar
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
    const linea = await LineaInvestigacionManager.actualizar(req, res)
    res.status(200).json({ success: true, linea })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/lineas-investigacion/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await LineaInvestigacionManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// Publicaciones asociadas
router.get('/:id/publicaciones', LineaInvestigacionManager.obtenerPublicaciones)
router.post('/:id/publicaciones', LineaInvestigacionManager.agregarPublicacion)
router.delete('/:id/publicaciones/:publicacionId', LineaInvestigacionManager.quitarPublicacion)

// Proyectos asociados
router.get('/:id/proyectos', LineaInvestigacionManager.obtenerProyectos)
router.post('/:id/proyectos', LineaInvestigacionManager.agregarProyecto)
router.delete('/:id/proyectos/:proyectoId', LineaInvestigacionManager.quitarProyecto)

module.exports = router
