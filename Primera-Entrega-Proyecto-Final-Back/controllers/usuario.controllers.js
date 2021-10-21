const fs = require('fs')
const UsuariosTxt = fs.readFileSync('./dataBase/usuarios.txt', 'utf-8')
const UsuariosTxTParse = JSON.parse(UsuariosTxt)
const moment = require('moment')
const Today = moment().format('DD/MM/YYYY')
const carTxt = fs.readFileSync('./dataBase/carrito.txt', 'utf-8')
const CartTxtParse = JSON.parse(carTxt)

exports.RegisterUser = (req, res) => {

    try {

        //Busca en el Array  de Usuarios el Ultimo ID Registrado
        let ultimoIDUser = (arr) => {
            let cantidad = arr.length
            if (cantidad !== 0) {
                let ultimo = arr[arr.length - 1];
                return ultimo.id
            }
        }

        let resultUserId = ultimoIDUser(UsuariosTxTParse)

        //Buscamos en el Array Carrito el ultimo ID Registrado
        let ultimoIDCart = (arr) => {
            let cantidad = arr.length
            if (cantidad !== 0) {
                let ultimo = arr[arr.length - 1];
                return ultimo.id
            }
        }

        let resultCartId = ultimoIDCart(CartTxtParse)

        const { usuario, contrasenia } = req.body

        const newUser = {
            /* En el caso de que el array este vacio le asignara el numero 1 al id, 
           sino le sumara 1 al numero que obtenga de result.- Los otros valores se agregaran
           tal cual lo reciban desde el body*/
            id: resultUserId == undefined ? 1 : resultUserId + 1,
            carritoID: resultCartId == undefined ? 1 : resultCartId + 1,
            usuario,
            contrasenia,
            admin: false,
            login: false
        }

        const newCart = {
            /* En el caso de que el array este vacio le asignara el numero 1 al id, 
            sino le sumara 1 al numero que obtenga de result.- Los otros valores se agregaran
            tal cual lo reciban desde el body*/
            id: resultCartId == undefined ? 1 : resultCartId + 1,
            idUser: resultUserId == undefined ? 1 : resultUserId + 1,
            timestamp: Today,
            producto: []

        }

        UsuariosTxTParse.push(newUser)
        CartTxtParse.push(newCart)

        //Pasamos el objeto a string
        let resultJsonUser = JSON.stringify(UsuariosTxTParse, null, 2)
        //Reescribimos el Archivo con el Nuevo Usuario
        fs.writeFileSync('./dataBase/usuarios.txt', `${resultJsonUser}`)

        //Pasamos el objeto a string
        let resultJsonCart = JSON.stringify(CartTxtParse, null, 2)
        //Reescribimos el Archivo con el Carrito nuevo 
        fs.writeFileSync('./dataBase/carrito.txt', `${resultJsonCart}`)

        res.status(201).json({ UsuariosTxTParse })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }

}

exports.LoginUser = (req, res) => {

    try {

        const { usuario, contrasenia } = req.body
        const user_exists = UsuariosTxTParse.filter(i => i.usuario == usuario)
        console.log(user_exists);
        const contraniaUser = user_exists.filter(i => i.contrasenia == contrasenia)
        console.log(contraniaUser);

        if (user_exists.length === 0 || contraniaUser.length === 0) {
            console.log('error de usuario');
            res.json({ msg: 'Usuario o contraseña incorrecto' })
        } else {

            for (let i = 0; i < UsuariosTxTParse.length; i++) {
                const element = UsuariosTxTParse[i];

                if (element.usuario == usuario && element.contrasenia == contrasenia) {
                    element.login = true
                }
            }

            //Pasamos el objeto a string
            let resultJson = JSON.stringify(UsuariosTxTParse, null, 2)

            //Reescribimos el Archivo sin el producto 
            fs.writeFileSync('./dataBase/usuarios.txt', `${resultJson}`)

            res.json(user_exists)
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

exports.LogoutUser = (req, res) => {

    try {

        const id = req.params.id
        const user_exists = UsuariosTxTParse.filter(i => i.id == id)

        for (let i = 0; i < UsuariosTxTParse.length; i++) {
            const element = UsuariosTxTParse[i];

            if (element.id == id) {
                element.login = false
            }
        }

        //Pasamos el objeto a string
        let resultJson = JSON.stringify(UsuariosTxTParse, null, 2)

        //Reescribimos el Archivo sin el producto 
        fs.writeFileSync('./dataBase/usuarios.txt', `${resultJson}`)

        res.json({ user_exists })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }

}