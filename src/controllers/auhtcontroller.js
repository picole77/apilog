


const jwt = require('jsonwebtoken')
const bcryptjs = require ('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

// procedimiento para registrase
exports.register =async (req, res)=>{
    try {
        const name =req.body.name
        const user =req.body.user
        const pass =req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)

        conexion.query('INSERT INTO usuarios aset ?',{user:user,name:name,pass:passHash},(error,results)=>{
            if(error){
                console.log(error)}
                res.redirect('/')
        })
    } catch (error) {
        console.log("error")
    }
    

}
exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass
        if(!user || !pass){
            res.render('login',{
                alert:true,
                alertTitle:"advertencia",
                alertMessage: "ingrese un usuario y password",
                alertIcon:"info",
                showConfirmButton: true,
                timer:false,
                ruta:'login'
            })
        }else{
            conexion.query('SELECT + FROM user WHERE user = ?',[user],async (error, results)=>{
                if(results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass))){
                res.render('login',{
                alert:true,
                alertTitle:"advertencia",
                alertMessage: "ingrese un usuario y password",
                alertIcon:"info",
                showConfirmButton: true,
                timer:false,
                ruta:'login'
                    })
                }else{
                    //inicio de sesion esta validado
                    const id = resultss[0].id
                    const token = jwt.sign({id:id},process.env.JWT_SECRETO,)

                }
            }
        )}
    } catch (error) {
        console.log(error)
    }
}