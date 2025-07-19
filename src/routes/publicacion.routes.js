const express = require("express")
const router = express.Router()
const PublicacionManager = require("../managers/PublicacionManager")

// GET /api/publicaciones - Obtener todas
router.get("/", async (req, res) => {
  await PublicacionManager.obtenerTodos(req, res)
})

// GET /api/publicaciones/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await PublicacionManager.obtenerPorId(req, res)
})

// POST /api/publicaciones - Crear
router.post("/", async (req, res) => {
  await PublicacionManager.crear(req, res)
})

// PUT /api/publicaciones/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await PublicacionManager.actualizar(req, res)
})

// DELETE /api/publicaciones/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await PublicacionManager.eliminar(req, res)
})

// Personas asociadas
router.get("/:id/personas", PublicacionManager.obtenerPersonas)
router.post("/:id/personas", PublicacionManager.agregarPersona)
router.delete("/:id/personas/:personaId", PublicacionManager.quitarPersona)

module.exports = router
