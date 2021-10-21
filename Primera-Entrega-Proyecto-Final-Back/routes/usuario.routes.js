const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario.controllers')

const { RegisterUser, LoginUser, LogoutUser } = usuarioController

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.get('/logout/:id', LogoutUser )


module.exports = router