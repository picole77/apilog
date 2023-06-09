const jwt = require('jsonwebtoken')
const bcryptjs = require ('bcryptjs')
const { conexion } = require('../database/conexion')
const {promisify} = require('util')
const { CREATE_USER, SELECT_USER } = require('../services/MysqlQueries')

// procedimiento para registrase
exports.register =async (req, res)=>{
    try {
        const {name, username, email, password } = req.body
        let passHash = await bcryptjs.hash(password, 8)

        conexion.query(CREATE_USER,[name, username, email, passHash, 1],(error,results)=>{
            if(error){
                console.log(error)
                return
            }
            res.json({"status": true, "message": "Usuario creado exitosamente"})
        })
    } catch (error) {
        console.log("error")
    }
}
// procedimiento para iniciar sesión
exports.login = async (req, res)=>{
    try {
        // console.log(req);
        const { username, password } = req.body
        if( !username || !password ){
            res.status(405).json({ "status": false, "message": "Ingrese su usuario y contraseña"})
            return
        }
            conexion.query(SELECT_USER,[username],async (error, results) => {
                //en caso de que surga un error
                if(error) {
                    res.status(405).json(error.message)
                    return
                }
                // en caso de que no exista el usuario
                if(!results.length) {
                    res.status(409).json({ "status": false, "message": "No existe el usuario o no lo ingresó correctamente"})
                    return
                }
                
                bcryptjs.compare(password, results[0].password, (bErr, bResults) => {
                    if(bErr) {
                        res.status(409).json({"status": false, "message": `error al comparar la contraseña ${bErr}`})
                        return
                    }
                    if(!bResults) {
                        res.status(401).json({"status": false, "message":"La contraseña no coincide, vuelva a ingresarla correctamente"})
                        return
                    }
                    // creación del token para la sesión del usuario
                    // se le asigna igualmente el tiempo o expiración de la sesión  
                    const token = jwt.sign({
                        id: results[0].id
                    }, process.env.JWT_SECRETO, {
                        algorithm: 'HS256',
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    const session = {
                        "id": results[0].id,
                        "username": results[0].username,
                        "name": results[0].nombre
                    }
                    //envío de la cookie para la creación de la sesión
                    res.cookie('token', token, { httpOnly: true}).json({ "status": true, "message": "Inicio de sesión", "session": session})
                })  
                
            })

    } catch (error) {
        console.log(error)
    }
}