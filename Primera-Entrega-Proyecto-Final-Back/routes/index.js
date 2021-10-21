const express = require('express')
const router = express.Router()

const productosRouter = require('./productos.routes')
const carritoRouter = require('./carrito.routes')
const usuarioRouter = require('./usuario.routes')

router.use('/productos', productosRouter)
router.use('/carritos', carritoRouter)
router.use('/usuarios', usuarioRouter)

module.exports = router