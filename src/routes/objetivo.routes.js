const express = require("express")
const router = express.Router()
const ObjetivoManager = require("../managers/ObjetivoManager")

// GET /api/objetivos - Obtener todos
router.get("/", async (req, res) => {
  await ObjetivoManager.obtenerTodos(req, res)
})

// GET /api/objetivos/:id - Obtener uno
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ObjetivoManager.obtenerPorId(req, res)
})

// POST /api/objetivos - Crear
router.post("/", async (req, res) => {
  await ObjetivoManager.crear(req, res)
})

// PUT /api/objetivos/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ObjetivoManager.actualizar(req, res)
})

// DELETE /api/objetivos/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await ObjetivoManager.eliminar(req, res)
})

module.exports = router
