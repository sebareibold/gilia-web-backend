const express = require("express")
const router = express.Router()
const TarjetaFlotanteManager = require("../managers/TarjetaFlotanteManager")

router.get("/", TarjetaFlotanteManager.obtenerTodos)
router.get("/:id", TarjetaFlotanteManager.obtenerPorId)
router.post("/", TarjetaFlotanteManager.crear)
router.put("/:id", TarjetaFlotanteManager.actualizar)
router.delete("/:id", TarjetaFlotanteManager.eliminar)

module.exports = router
