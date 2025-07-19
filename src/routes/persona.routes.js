const express = require("express")
const router = express.Router()
const PersonaManager = require("../managers/PersonaManager")

// GET /api/personas - Obtener todas
router.get("/", async (req, res) => {
  await PersonaManager.obtenerTodos(req, res)
})

// GET /api/personas/:id - Obtener una
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await PersonaManager.obtenerPorId(req, res)
})

// POST /api/personas - Crear
router.post("/", async (req, res) => {
  await PersonaManager.crear(req, res)
})

// PUT /api/personas/:id - Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await PersonaManager.actualizar(req, res)
})

// DELETE /api/personas/:id - Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await PersonaManager.eliminar(req, res)
})

// Publicaciones asociadas
router.get('/:id/publicaciones', PersonaManager.obtenerPublicaciones)
router.post('/:id/publicaciones', PersonaManager.agregarPublicacion)
router.delete('/:id/publicaciones/:publicacionId', PersonaManager.quitarPublicacion)

module.exports = router
