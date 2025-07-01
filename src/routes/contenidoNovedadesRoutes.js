const express = require("express")
const router = express.Router()
const ContenidoNovedadesManager = require("../managers/ContenidoNovedadesManager")

router.get("/", ContenidoNovedadesManager.obtenerTodos)
router.get("/:id", ContenidoNovedadesManager.obtenerPorId)
router.post("/", ContenidoNovedadesManager.crear)
router.put("/:id", ContenidoNovedadesManager.actualizar)
router.delete("/:id", ContenidoNovedadesManager.eliminar)

module.exports = router
