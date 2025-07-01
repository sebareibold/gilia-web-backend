const express = require("express")
const router = express.Router()
const ContenidoPresentacionManager = require("../managers/ContenidoPresentacionManager")

router.get("/", ContenidoPresentacionManager.obtenerTodos)
router.get("/:id", ContenidoPresentacionManager.obtenerPorId)
router.post("/", ContenidoPresentacionManager.crear)
router.put("/:id", ContenidoPresentacionManager.actualizar)
router.delete("/:id", ContenidoPresentacionManager.eliminar)

module.exports = router
