const express = require("express")
const router = express.Router()
const UsuarioManager = require("../managers/UsuarioManager")

// GET /api/usuarios - Obtener todos los usuarios
router.get("/", async (req, res) => {
  await UsuarioManager.obtenerTodos(req, res)
})

// GET /api/usuarios/:id - Obtener usuario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await UsuarioManager.obtenerPorId(req, res)
})

// POST /api/usuarios - Crear nuevo usuario
router.post("/", async (req, res) => {
  await UsuarioManager.crear(req, res)
})

// PUT /api/usuarios/:id - Actualizar usuario
router.put("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await UsuarioManager.actualizar(req, res)
})

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  await UsuarioManager.eliminar(req, res)
})

// POST /api/usuarios/login - Login de usuario
router.post("/login", async (req, res) => {
  await UsuarioManager.login(req, res)
})

module.exports = router
