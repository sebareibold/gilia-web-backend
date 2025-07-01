const express = require("express")
const router = express.Router()
const PublicacionManager = require("../managers/PublicacionManager")

router.get("/", PublicacionManager.obtenerTodos)
router.get("/:id", PublicacionManager.obtenerPorId)
router.post("/", PublicacionManager.crear)
router.put("/:id", PublicacionManager.actualizar)
router.delete("/:id", PublicacionManager.eliminar)

module.exports = router
