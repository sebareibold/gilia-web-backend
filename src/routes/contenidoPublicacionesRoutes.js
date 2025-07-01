const express = require("express")
const router = express.Router()
const ContenidoPublicacionesManager = require("../managers/ContenidoPublicacionesManager")

router.get("/", ContenidoPublicacionesManager.obtenerTodos)
router.get("/:id", ContenidoPublicacionesManager.obtenerPorId)
router.post("/", ContenidoPublicacionesManager.crear)
router.put("/:id", ContenidoPublicacionesManager.actualizar)
router.delete("/:id", ContenidoPublicacionesManager.eliminar)

module.exports = router
