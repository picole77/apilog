const jwt = require('jsonwebtoken')
const bcryptjs = require ('bcryptjs')
const { conexion } = require('../database/conexion')
const { formidable } = require('formidable')
const fs = require('fs')
const path = require('path')
const { isValidFile } = require('../services/utils')
const { CREATE_USER, SELECT_USER } = require('../services/MysqlQueries')

// procedimiento para registrase
exports.register = async (req, res)=>{
    try {
        // save image in server
        const uploadPath = path.join('public', 'images')
        // receive form data
        const form = formidable({
             multiples: true,
             maxFieldsSize: 50*1024*1024,
             uploadDir: uploadPath
            })
        // loop fields and file
        form.parse(req, async (err, fields, files) => {
            
            if(err) {
                return res.status(400).json({
                    status: false,
                    message: 'Error al procesar la solicitud',
                    error: err
                })
            }
            
            const nombre_usuario = fields.nombre_usuario[0]
            const email = fields.email[0]
            const password = fields.password[0]
            const nombre_completo = fields.nombre_completo[0]
            const numero_telefonico = fields.numero_telefonico[0]
            const address = fields.address[0]
            const rol = fields.rol[0]

            // insert single file
            if(files.file.length) {
            }
            const file = files.file[0]
            const isValid = isValidFile(file)
            const extension = file.mimetype.split('/').pop()
            const parseFileName = encodeURIComponent(nombre_usuario.replace(/\s/g,'-'))
            const fileName = `${parseFileName}.${extension}`
            // console.log(fileName);

            if(!isValid) {
                return res.status(400).json({
                    status: false,
                    message: 'La imagen no tiene el fomato valido: jpg, png o jpeg'
                })
            }

            try {
                // renames the file in the directory
                // join file and path directory
                const joinPath = path.join(uploadPath, fileName)
                //insert into folder
                fs.renameSync(file.filepath, joinPath);
            } catch (error) {
                console.log(error);
            }
            
            //crypt password
            let passHash = await bcryptjs.hash(password, 8)

            const imagen = fileName
            
            conexion.query(CREATE_USER,[nombre_usuario, email, passHash, nombre_completo, numero_telefonico, address, imagen, rol ],(error,results)=>{
                if(error){
                    console.log(error)
                    return
                }
                res.json({"status": true, "message": "Usuario creado exitosamente"})
            })
        })
    } catch (error) {
        console.log("error"+error)
    }
}
// procedimiento para iniciar sesión
exports.login = async (req, res ) => {
    try {
        // console.log(req);
        const { nombre_usuario, password } = req.body
        if( !nombre_usuario || !password ){
            res.status(405).json({ "status": false, "message": "Ingrese su usuario y contraseña"})
            return
        }
            conexion.query(SELECT_USER,[nombre_usuario],async (error, results) => {
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
                        "nombre_usuario": results[0].nombre_usuario,
                        "nombre_completo": results[0].nombre_completo,
                        "rol": results[0].rol_id
                    }
                    //envío de la cookie para la creación de la sesión
                    res.cookie('token', token, { httpOnly: true}).json({ "status": true, "message": "Inicio de sesión", "session": session})
                })  
                
            })

    } catch (error) {
        console.log(error)
    }
}