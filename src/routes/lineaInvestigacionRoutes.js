const express = require("express")
const router = express.Router()
const LineaInvestigacionManager = require("../managers/LineaInvestigacionManager")

router.get("/", LineaInvestigacionManager.obtenerTodos)
router.get("/:id", LineaInvestigacionManager.obtenerPorId)
router.post("/", LineaInvestigacionManager.crear)
router.put("/:id", LineaInvestigacionManager.actualizar)
router.delete("/:id", LineaInvestigacionManager.eliminar)

module.exports = router
