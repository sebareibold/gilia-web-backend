console.log('INICIO usuarioRoutes.js')
const express = require("express")
const router = express.Router()
const UsuarioManager = require("../managers/UsuarioManager")

// GET /api/usuarios - Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await UsuarioManager.obtenerTodos(req, res)
    res.status(200).json({ success: true, usuarios })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// GET /api/usuarios/:id - Obtener usuario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const usuario = await UsuarioManager.obtenerPorId(req, res)
    if (!usuario) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado" })
    }
    res.status(200).json({ success: true, usuario })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/usuarios - Crear nuevo usuario
router.post("/", async (req, res) => {
  const { nombre, email } = req.body
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ success: false, error: "Email es requerido y debe ser válido" })
  }
  try {
    const usuario = await UsuarioManager.crear(req, res)
    res.status(201).json({ success: true, usuario })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// PUT /api/usuarios/:id - Actualizar usuario
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nombre, email } = req.body
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  if (!nombre || typeof nombre !== "string") {
    return res.status(400).json({ success: false, error: "Nombre es requerido y debe ser string" })
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ success: false, error: "Email es requerido y debe ser válido" })
  }
  try {
    const usuario = await UsuarioManager.actualizar(req, res)
    res.status(200).json({ success: true, usuario })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, error: "ID inválido" })
  }
  try {
    const resultado = await UsuarioManager.eliminar(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

// POST /api/usuarios/login - Login de usuario
router.post("/login", async (req, res) => {
  // Aquí podrías agregar validaciones básicas de login si lo deseas
  try {
    const resultado = await UsuarioManager.login(req, res)
    res.status(200).json({ success: true, resultado })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  }
})

console.log('Fin de usuarioRoutes.js')
module.exports = router
