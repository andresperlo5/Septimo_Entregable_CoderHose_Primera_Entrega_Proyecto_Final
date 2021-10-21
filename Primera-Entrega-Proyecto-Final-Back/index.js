//Configuracion de la libreria dotenv
require('dotenv').config()
//requerimos express para armar nuestro servidor
const express = require('express')
const app = express()
//CORS
const cors = require('cors')
app.use(cors())
//Usamos morgan para registrar los detalles de las solicitudes
const morgan = require('morgan')
//Definimos los puertos para desarrollo y produccion
const port = process.env.PORT || 3001

//Middlewars
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Rutas
const routerRoutes = require('./routes')
app.use('/api', routerRoutes)

//Si no encuentra una ruta devuelve 404
app.use((req, res, next) => {
    res.status(404).json('Pagina no Encontrada')
})
//Activamos el puerto
app.listen(port, () => {
    console.log('Escuchando Puerto: ', port);
})
