const express = require("express")
const router = express.Router()
const ProyectoManager = require("../managers/ProyectoManager")

// GET /api/proyectos - Obtener todos
router.get("/", async (req, res) => {
  await ProyectoManager.obtenerTodos(req, res)
})

// GET /api/proyectos/:id - Obtener uno
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ProyectoManager.obtenerPorId(req, res)
})

// POST /api/proyectos - Crear
router.post("/", async (req, res) => {
  await ProyectoManager.crear(req, res)
})

// PUT /api/proyectos/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ProyectoManager.actualizar(req, res)
})

// DELETE /api/proyectos/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ProyectoManager.eliminar(req, res)
})

// Personas asociadas
router.get('/:id/personas', ProyectoManager.obtenerPersonas)
router.post('/:id/personas', ProyectoManager.agregarPersona)
router.delete('/:id/personas/:personaId', ProyectoManager.quitarPersona)

// Líneas de investigación asociadas
router.get('/:id/lineas-investigacion', ProyectoManager.obtenerLineasInvestigacion)
router.post('/:id/lineas-investigacion', ProyectoManager.agregarLineaInvestigacion)
router.delete('/:id/lineas-investigacion/:lineaId', ProyectoManager.quitarLineaInvestigacion)

// Líneas de extensión asociadas
router.get('/:id/lineas-extension', ProyectoManager.obtenerLineasExtension)
router.post('/:id/lineas-extension', ProyectoManager.agregarLineaExtension)
router.delete('/:id/lineas-extension/:lineaId', ProyectoManager.quitarLineaExtension)

module.exports = router
