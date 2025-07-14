console.log('INICIO contenidoGaleriaRoutes.js')
const express = require("express")
const router = express.Router()
const ContenidoGaleriaManager = require("../managers/ContenidoGaleriaManager")

console.log('Antes de definir rutas en contenidoGaleriaRoutes.js')

// GET / - Obtener todos
router.get("/", async (req, res) => {
    try {
        console.log('GET / - contenidoGaleria - obtenerTodos')
        await ContenidoGaleriaManager.obtenerTodos(req, res)
    } catch (error) {
        console.error('Error en GET / contenidoGaleria:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener los contenidos de galería'
        })
    }
})

// GET /:id - Obtener por ID
router.get("/:id", async (req, res) => {
    try {
        console.log('GET /:id - contenidoGaleria - obtenerPorId')
        const { id } = req.params
        
        // Validar que id sea un número válido
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'El ID debe ser un número válido mayor a 0'
            })
        }
        
        await ContenidoGaleriaManager.obtenerPorId(req, res)
    } catch (error) {
        console.error('Error en GET /:id contenidoGaleria:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener el contenido de galería'
        })
    }
})

// POST / - Crear nuevo
router.post("/", async (req, res) => {
    try {
        console.log('POST / - contenidoGaleria - crear')
        const { body } = req
        
        // Validar que el body no esté vacío
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({
                error: 'Body vacío',
                message: 'El body de la petición no puede estar vacío'
            })
        }
        
        await ContenidoGaleriaManager.crear(req, res)
    } catch (error) {
        console.error('Error en POST / contenidoGaleria:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al crear el contenido de galería'
        })
    }
})

// PUT /:id - Actualizar
router.put("/:id", async (req, res) => {
    try {
        console.log('PUT /:id - contenidoGaleria - actualizar')
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
        
        await ContenidoGaleriaManager.actualizar(req, res)
    } catch (error) {
        console.error('Error en PUT /:id contenidoGaleria:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al actualizar el contenido de galería'
        })
    }
})

// DELETE /:id - Eliminar
router.delete("/:id", async (req, res) => {
    try {
        console.log('DELETE /:id - contenidoGaleria - eliminar')
        const { id } = req.params
        
        // Validar que id sea un número válido
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'El ID debe ser un número válido mayor a 0'
            })
        }
        
        await ContenidoGaleriaManager.eliminar(req, res)
    } catch (error) {
        console.error('Error en DELETE /:id contenidoGaleria:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al eliminar el contenido de galería'
        })
    }
})

console.log('Fin de contenidoGaleriaRoutes.js')
module.exports = router
