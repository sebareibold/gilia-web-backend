const express = require("express")
const router = express.Router()
const HerramientaManager = require("../managers/HerramientaManager")

// GET /api/herramientas - Obtener todas
router.get("/", async (req, res) => {
  await HerramientaManager.obtenerTodos(req, res)
})

// GET /api/herramientas/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await HerramientaManager.obtenerPorId(req, res)
})

// POST /api/herramientas - Crear
router.post("/", async (req, res) => {
  await HerramientaManager.crear(req, res)
})

// PUT /api/herramientas/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await HerramientaManager.actualizar(req, res)
})

// DELETE /api/herramientas/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await HerramientaManager.eliminar(req, res)
})

module.exports = router 