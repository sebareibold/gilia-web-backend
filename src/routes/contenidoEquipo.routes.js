const express = require("express")
const router = express.Router()
const ContenidoEquipoManager = require("../managers/ContenidoEquipoManager")

// GET /api/contenido-equipo - Obtener todos
router.get("/", async (req, res) => {
  await ContenidoEquipoManager.obtenerTodos(req, res)
})

// GET /api/contenido-equipo/:id - Obtener uno
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ContenidoEquipoManager.obtenerPorId(req, res)
})

// POST /api/contenido-equipo - Crear
router.post("/", async (req, res) => {
  await ContenidoEquipoManager.crear(req, res)
})

// PUT /api/contenido-equipo/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ContenidoEquipoManager.actualizar(req, res)
})

// DELETE /api/contenido-equipo/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ContenidoEquipoManager.eliminar(req, res)
})

module.exports = router
