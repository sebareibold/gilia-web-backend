const express = require("express")
const router = express.Router()
const ContenidoGaleriaManager = require("../managers/ContenidoGaleriaManager")

// GET / - Obtener todos
router.get("/", (req, res) => {
    ContenidoGaleriaManager.obtenerTodos(req, res)
})

// GET /:id - Obtener por ID
router.get("/:id", (req, res) => {
    const { id } = req.params
    
    // Validar que id sea un número válido
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: 'ID inválido',
            message: 'El ID debe ser un número válido mayor a 0'
        })
    }
    
    ContenidoGaleriaManager.obtenerPorId(req, res)
})

// POST / - Crear nuevo
router.post("/", (req, res) => {
    const { body } = req
    
    // Validar que el body no esté vacío
    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({
            error: 'Body vacío',
            message: 'El body de la petición no puede estar vacío'
        })
    }
    
    ContenidoGaleriaManager.crear(req, res)
})

// PUT /:id - Actualizar
router.put("/:id", (req, res) => {
    const { id } = req.params
    const { body } = req
    
    // Validar que id sea un número válido
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: 'ID inválido',
            message: 'El ID debe ser un número válido mayor a 0'
        })
    }
    
    // Validar que el body no esté vacío
    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({
            error: 'Body vacío',
            message: 'El body de la petición no puede estar vacío'
        })
    }
    
    ContenidoGaleriaManager.actualizar(req, res)
})

// DELETE /:id - Eliminar
router.delete("/:id", (req, res) => {
    const { id } = req.params
    
    // Validar que id sea un número válido
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: 'ID inválido',
            message: 'El ID debe ser un número válido mayor a 0'
        })
    }
    
    ContenidoGaleriaManager.eliminar(req, res)
})

module.exports = router
