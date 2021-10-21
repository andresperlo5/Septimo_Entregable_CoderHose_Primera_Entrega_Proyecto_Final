/* En este middlawares lo que hacemos es cuando un usuario este logueado tendra ciertos permisos.
Entonces para asegurarnos de que no accedan a ciertas rutas se realiza verificacion de su rol.
Que el mismo se encuentra en la base de datos y si es admin podra acceder a las rutas privadas
 y sino solamente a las rutas publicas. Para asegurarnos de esto se hace un if donde se
 comprueban si el rol que esta en el back y en la base de datos es el mismo. Si es admin en ambos se hace
 next y se realiza las funciones que esten en el endpoint. Ahora sino si el role del back que es hardcodeable
 es distinto al que esta en la base de datos entonces lo mismo nose le dara el permiso*/
const fs = require('fs')
const UserT = fs.readFileSync('./dataBase/usuarios.txt', 'utf-8')
const UserTxPar = JSON.parse(UserT)

module.exports = (role) => async (req, res, next) => {
   
    let id = req.params.id_user
    let userId = UserTxPar.filter(i => i.id == id)
    let admin = userId.map(i => i.admin).toString()

    if (admin == 'false' && role !== 'admin' || admin == 'false' && role == 'admin' ) {
        return res.status(401).json({ msg: 'No Autorizado' })
    } else if (admin == 'true' && role == 'admin') {
        next()
    }
}