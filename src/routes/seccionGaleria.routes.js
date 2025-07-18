const express = require("express")
const router = express.Router()
const SeccionGaleriaManager = require("../managers/SeccionGaleriaManager")

// GET /api/seccion-galeria - Obtener todas
router.get("/", async (req, res) => {
  await SeccionGaleriaManager.obtenerTodos(req, res)
})

// GET /api/seccion-galeria/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await SeccionGaleriaManager.obtenerPorId(req, res)
})

// POST /api/seccion-galeria - Crear
router.post("/", async (req, res) => {
  await SeccionGaleriaManager.crear(req, res)
})

// PUT /api/seccion-galeria/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await SeccionGaleriaManager.actualizar(req, res)
})

// DELETE /api/seccion-galeria/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await SeccionGaleriaManager.eliminar(req, res)
})

module.exports = router 