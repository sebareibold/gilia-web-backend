const express = require("express")
const router = express.Router()
const UsuarioManager = require("../managers/UsuarioManager")

// GET /api/usuarios - Obtener todos los usuarios
router.get("/", UsuarioManager.obtenerTodos)

// GET /api/usuarios/:id - Obtener usuario por ID
router.get("/:id", UsuarioManager.obtenerPorId)

// POST /api/usuarios - Crear nuevo usuario
router.post("/", UsuarioManager.crear)

// PUT /api/usuarios/:id - Actualizar usuario
router.put("/:id", UsuarioManager.actualizar)

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete("/:id", UsuarioManager.eliminar)

// POST /api/usuarios/login - Login de usuario
router.post("/login", UsuarioManager.login)

module.exports = router
