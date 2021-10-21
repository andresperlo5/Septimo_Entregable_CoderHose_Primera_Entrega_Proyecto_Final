/* Se Solicita el modelo del Carrito para realizar las distintas funciones para 
cumplir con los requisitos del entregable de la semana(CRUD) */
const fs = require('fs')
const moment = require('moment')
const Today = moment().format('DD/MM/YYYY')
const carTxt = fs.readFileSync('./dataBase/carrito.txt', 'utf-8')
const CartTxtParse = JSON.parse(carTxt)
const ProductsTxt = fs.readFileSync('./dataBase/productos.txt', 'utf-8')
const ProductsTxTParse = JSON.parse(ProductsTxt)

//EndPoints Carrito

//Crea un Carrito Nuevo
exports.CreateCart = (req, res) => {

    try {
        //Busca en el Array el Ultimo ID
        let ultimoID = (arr) => {
            let cantidad = arr.length
            if (cantidad !== 0) {
                let ultimo = arr[arr.length - 1];
                return ultimo.id
            }
        }

        let result = ultimoID(CartTxtParse)

        //Obtiene los datos del body para crear el nuevo Carrito

        const newCart = {
            /* En el caso de que el array este vacio le asignara el numero 1 al id, 
            sino le sumara 1 al numero que obtenga de result.- Los otros valores se agregaran
            tal cual lo reciban desde el body*/
            id: result == undefined ? 1 : result + 1,
            timestamp: Today,
            producto: []

        }
        //Agrega el nuevo Carrito al Arrays de Carrito
        CartTxtParse.push(newCart)

        //Pasamos el objeto a string
        let resultJson = JSON.stringify(CartTxtParse, null, 2)

        //Reescribimos el Archivo con el Carrito nuevo 
        fs.writeFileSync('./dataBase/carrito.txt', `${resultJson}`)
        let idNewCart = newCart.id

        //Devolvemos el Nuevo Producto Agregado al Carrito
        res.status(201).json({idNewCart})

    } catch (error) {
       res.status(500).json(error)
    }
}

//Agrega mas productos al carrito
exports.addProductsInCart = (req, res) => {

    try {

        //Obtenemos el ID que se le pasa por la URL
        const id = req.params.id
        console.log('idBack', id);
        //Obtenemos el ID del producto
        const idP = req.params.id_prod
        console.log('idprod back', idP);

        //Buscamos el Producto segun el id para agregar al Carrito
        const searchProduct = ProductsTxTParse.filter(i => i.id == idP)
        console.log('searchProduc', searchProduct);
        //Recorremos el Array de Carrito y Agregamos el producto
        for (let i = 0; i < CartTxtParse.length; i++) {
            const element = CartTxtParse[i];
            if (element.id == id) {
                console.log('element', element);
                let cart = element.producto
                console.log('cart', cart);
                cart.push(...searchProduct)
            }
        }

        //Pasamos el objeto a string
        let resultJson = JSON.stringify(CartTxtParse, null, 2)
        console.log('resultJsn', resultJson);
        //Reescribimos el Archivo con el Producto nuevo 
        fs.writeFileSync('./dataBase/carrito.txt', `${resultJson}`)

        //Mostramos el Carrito
        res.status(200).json({msg: 'Se agrego el Producto al Carrito'})
    } catch (error) {
        res.status(500).json(error)
    }
}

//Devuelve un Carrito y sus productos
exports.GetCart = async (req, res) => {

    try {
        //Obtenemos el ID que se le pasa por la URL
        const id = req.params.id

        //Recorre el Array de Carrito
        for (let i = 0; i < CartTxtParse.length; i++) {
            const element = CartTxtParse[i];
            if (element.id == id) {
                //Retorna el Producto del Carrito que coincida con el ID que se paso por la URL
                res.status(200).json(element)
            }
        }
    } catch (error) {
         res.status(500).json(error)
    }
}

//Elimina un producto del Carrito
exports.DeleteOneProductCart = (req, res) => {

    try {
        //Obtenemos el ID del carrito que se le pasa por la URL
        const id = req.params.id

        //Obtenemos el ID del producto que se le pasa por la URL
        const id_prod = req.params.id_prod

        //Buscamos el Carrito que coincida con el ID
        const searchCart = CartTxtParse.filter(i => i.id == id)

        //Recorremos el Array y buscamos el Carrito que conincida con el ID
        for (let i = 0; i < CartTxtParse.length; i++) {
            const element = CartTxtParse[i];
            if (element.id == id) {
                //Obtenemos el Carrito y todos sus productos
                let prodCart = element.producto
                //Buscamos el index del producto que coincida ID
                let prodCartIndex = prodCart.findIndex(i => i.id == id_prod)
                //Eliminamos el Producto
                prodCart.splice(prodCartIndex, 1)
            }
        }

        //Pasamos el objeto a string
        let resultJson = JSON.stringify(CartTxtParse, null, 2)

        //Reescribimos el Archivo sin el producto 
        fs.writeFileSync('./dataBase/carrito.txt', `${resultJson}`)

        //Devolvemos el Carrito sin el producto
        res.status(200).json(searchCart)

    } catch (error) {
         res.status(500).json(error)
    }
}

exports.DeleteOneCartAndProducts = (req, res) => {

    try {
        //Obtenemos el ID del carrito que se le pasa por la URL
        const id = req.params.id

        //Obtenemos el objeto que coincida con la busqueda del ID recibido
        let objCart = CartTxtParse.filter(i => i.id == id)

        //Obtenemos el Index que coincida con la busqueda del ID recibido
        let indexCart = CartTxtParse.findIndex(i => i.id == id)

        //Recorremos el Array del objeto encontrado
        for (let i = 0; i < objCart.length; i++) {
            const element = objCart[i];
            let prodCart = element.producto
            //Eliminamos los Productos del Carrito
            prodCart.splice(0, prodCart.length)
        }

        //Eliminamos el Carrito
        CartTxtParse.splice(indexCart, 1)

        //Pasamos el objeto a string
        let resultJson = JSON.stringify(CartTxtParse, null, 2)
        
        //Reescribimos el Archivo sin el producto 
        fs.writeFileSync('./dataBase/carrito.txt', `${resultJson}`)

        //Devolvemos los Carritos Activos
        res.status(200).json(CartTxtParse)
    } catch (error) {
         res.status(500).json(error)
    }
}
