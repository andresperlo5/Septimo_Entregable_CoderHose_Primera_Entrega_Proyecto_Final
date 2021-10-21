/* Se Solicita el modelo de los productos para realizar las distintas funciones para 
cumplir con los requisitos del entregable de la semana(CRUD) */
const fs = require('fs')
const moment = require('moment')
const Today = moment().format('DD/MM/YYYY')
const ProdutsTxt = fs.readFileSync('./dataBase/productos.txt', 'utf-8')
const ProductsTxTParse = JSON.parse(ProdutsTxt)

//EndPoints Products
exports.CreateProducts = (req, res) => {

    try {
        //Busca en el Array el Ultimo ID
        let ultimoID = (arr) => {
            let cantidad = arr.length
            if (cantidad !== 0) {
                let ultimo = arr[arr.length - 1];
                return ultimo.id
            }
        }

        let result = ultimoID(ProductsTxTParse)

        //Obtiene los datos del body para crear el nuevo producto
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        const newProduct = {
            /* En el caso de que el array este vacio le asignara el numero 1 al id, 
            sino le sumara 1 al numero que obtenga de result.- Los otros valores se agregaran
            tal cual lo reciban desde el body*/
            id: result == undefined ? 1 : result + 1,
            timestamp: Today,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        }
        //Agrega el nuevo producto al Array
        ProductsTxTParse.push(newProduct)

        //Pasamos el objeto a string
        let resultJson = JSON.stringify(ProductsTxTParse, null, 2)

        //Reescribimos el Archivo con el Producto nuevo 
        fs.writeFileSync('./dataBase/productos.txt', `${resultJson}`)

        //Devolvemos el Nuevo Producto Agregado
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.GetProduct = async (req, res) => {

    try {
        //Obtenemos el ID que se le pasa por la URL
        const id = req.params.id

        /*Verificamos el id. Si hay id entonces devolvemos ese producto, 
          de lo contrario devuelve todos los productos */

        if (id !== undefined) {
            //Recorre el Array de Productos
            for (let i = 0; i < ProductsTxTParse.length; i++) {
                const element = ProductsTxTParse[i];
                if (element.id == id) {
                    //Retorna el Producto que coincida con el ID que se paso por la URL
                    res.status(200).json(element)
                }
            }
        } else {
            res.status(200).json(ProductsTxTParse)
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.ModifyProduct = (req, res) => {

    try {
        //Obtenemos el ID que se le pasa por la URL
        const idP = req.params.id
        console.log('idParams Back', idP);
        //Datos desde el body a espera para la modificacion
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body
        console.log('BackBody', req.body);
        //Buscamos el index donde esta el producto a modificar
        let indexx = ProductsTxTParse.findIndex(i => i.id == idP);

        //Se arma el nuevo Objeto con los valores recibidos desde el body
        const ModifyProd = {
            id: idP,
            timestamp,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        }
        //Modificamos el Producto
        ProductsTxTParse[indexx] = ModifyProd

        //Pasamos el objeto a string
        let resultJson = JSON.stringify(ProductsTxTParse, null, 2)

        //Reescribimos el Archivo con el Producto Modificado
        fs.writeFileSync('./dataBase/productos.txt', `${resultJson}`)

        //Devolvemos el Array Completo con el Producto Modificado
        res.status(200).json(ProductsTxTParse)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.DeleteProduct = (req, res) => {

    try {
        //Obtenemos el ID que se le pasa por la URL
        const id = req.params.id

        //Buscamos el index donde esta el producto a eliminar
        let indexx = ProductsTxTParse.findIndex(i => i.id == id);

        if (indexx == -1) {
            res.status(404).json('ID Incorrecto')
        } else {
            //Eliminamos el Producto Encontrado
            ProductsTxTParse.splice(indexx, 1)

            //Pasamos el objeto a string
            let resultJson = JSON.stringify(ProductsTxTParse, null, 2)

            //Reescribimos el Archivo sin el Producto 
            fs.writeFileSync('./dataBase/productos.txt', `${resultJson}`)

            //Devolvemos el Array sin el Producto
            res.status(200).json(ProductsTxTParse)
        }

    } catch (error) {
        res.status(500).json(error)
    }
}
