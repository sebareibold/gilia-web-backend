const express = require("express")
const router = express.Router()
const ContenidoHomeManager = require("../managers/ContenidoHomeManager")

router.get("/", ContenidoHomeManager.obtenerTodos)
router.get("/:id", ContenidoHomeManager.obtenerPorId)
router.post("/", ContenidoHomeManager.crear)
router.put("/:id", ContenidoHomeManager.actualizar)
router.delete("/:id", ContenidoHomeManager.eliminar)

module.exports = router
