const express = require('express')
const router = express.Router()
const auth = require('../middlewars/auth')
const productosControllers = require('../controllers/productos.controllers')
const { CreateProducts, GetProduct, ModifyProduct, DeleteProduct } = productosControllers

//Creamos un Producto
router.post('/:id_user',auth('admin'), CreateProducts)
//Traemos un Producto 
router.get('/:id?', GetProduct)
//Editamos un Producto 
router.put('/:id/usuario/:id_user',auth('admin'), ModifyProduct)
//Eliminamos un Producto
router.delete('/:id/usuario/:id_user',auth('admin'), DeleteProduct)

/* //Creamos un Producto
router.post('/', CreateProducts)
//Traemos un Producto 
router.get('/:id?', GetProduct)
//Editamos un Producto 
router.put('/:id', ModifyProduct)
//Eliminamos un Producto
router.delete('/:id', DeleteProduct) */

module.exports = router
