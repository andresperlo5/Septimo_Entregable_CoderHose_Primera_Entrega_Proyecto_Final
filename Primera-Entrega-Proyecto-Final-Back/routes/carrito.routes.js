const express = require('express')
const router = express.Router()
const carritoControllers = require('../controllers/carrito.controllers')
const { CreateCart, addProductsInCart, GetCart,
    DeleteOneProductCart, DeleteOneCartAndProducts } = carritoControllers

//Creamos un Carrito
router.post('/', CreateCart)
//Agregamos un Producto al carrito
router.post('/:id/productos/:id_prod', addProductsInCart)
//Vemos los productos cargados en un carrito
router.get('/:id/productos', GetCart)
//Eliminamos un producto del carrito
router.delete('/:id/productos/:id_prod', DeleteOneProductCart)
//Eliminamos el Carrito Completamente
router.delete('/:id', DeleteOneCartAndProducts)

module.exports = router
