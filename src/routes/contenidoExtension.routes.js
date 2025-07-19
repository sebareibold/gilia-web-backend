const express = require("express")
const router = express.Router()
const ContenidoExtensionManager = require("../managers/ContenidoExtensionManager")

// GET / - Obtener todos
router.get("/", async (req, res) => {
    try {
        await ContenidoExtensionManager.obtenerTodos(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener los contenidos de extensión'
        })
    }
})

// GET /:id - Obtener por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        
        // Validar que id sea un número válido
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'El ID debe ser un número válido mayor a 0'
            })
        }
        
        await ContenidoExtensionManager.obtenerPorId(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener el contenido de extensión'
        })
    }
})

// POST / - Crear nuevo
router.post("/", async (req, res) => {
    try {
        const { body } = req
        
        // Validar que el body no esté vacío
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({
                error: 'Body vacío',
                message: 'El body de la petición no puede estar vacío'
            })
        }
        
        await ContenidoExtensionManager.crear(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al crear el contenido de extensión'
        })
    }
})

// PUT /:id - Actualizar
router.put("/:id", async (req, res) => {
    try {
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
        
        await ContenidoExtensionManager.actualizar(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al actualizar el contenido de extensión'
        })
    }
})

// DELETE /:id - Eliminar
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        
        // Validar que id sea un número válido
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'El ID debe ser un número válido mayor a 0'
            })
        }
        
        await ContenidoExtensionManager.eliminar(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al eliminar el contenido de extensión'
        })
    }
})

module.exports = router
