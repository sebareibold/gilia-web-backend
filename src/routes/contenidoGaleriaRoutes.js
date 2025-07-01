const express = require("express")
const router = express.Router()
const ContenidoGaleriaManager = require("../managers/ContenidoGaleriaManager")

router.get("/", ContenidoGaleriaManager.obtenerTodos)
router.get("/:id", ContenidoGaleriaManager.obtenerPorId)
router.post("/", ContenidoGaleriaManager.crear)
router.put("/:id", ContenidoGaleriaManager.actualizar)
router.delete("/:id", ContenidoGaleriaManager.eliminar)

module.exports = router
