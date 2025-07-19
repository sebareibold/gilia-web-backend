const express = require("express")
const router = express.Router()
const NovedadManager = require("../managers/NovedadManager")

// GET /api/novedades - Obtener todas
router.get("/", async (req, res) => {
  await NovedadManager.obtenerTodos(req, res)
})

// GET /api/novedades/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await NovedadManager.obtenerPorId(req, res)
})

// POST /api/novedades - Crear
router.post("/", async (req, res) => {
  await NovedadManager.crear(req, res)
})

// PUT /api/novedades/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await NovedadManager.actualizar(req, res)
})

// DELETE /api/novedades/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await NovedadManager.eliminar(req, res)
})

module.exports = router
