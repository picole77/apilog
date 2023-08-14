const { conexion }  = require('../database/conexion')
const { SELECT_PRODUCT_COCINA, CREATE_PRODUCT_COCINA, DELETE_PRODUCT_COCINA } = require('../services/MysqlQueries')

exports.select_product_cocina = (req, res) => {
        
    const id = req.params.productId

    conexion.query(SELECT_PRODUCT_COCINA, (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":"Ocurrió un error al eliminar el producto"})
            return
        }
        res.json({ "status": true, "data": results})
    })
}

exports.create_product_cocina = (req, res) => {
    console.log(req.body);
    const {nombre, descripcion, precio} = req.body

    conexion.query(CREATE_PRODUCT_COCINA, [nombre, descripcion, precio], (error, results) => {
        if(error) {
            return res.status(500).json({status: false, message: 'Ocurrió un error al registrar la comida'})
        }

        res.status(201).json({status: true, message: 'Se ha registrado correctamente la comida'})
    })
}
exports.delete_product_cocina = (req, res) => {
    const id = req.params.id

    conexion.query(DELETE_PRODUCT_COCINA, [id], (error, results) => {
        if(error) {
            return res.status(409).json({status:false, message: "Ocurrió un error al tratar de eliminar la comida"})
        }
        res.status(201).json({status: true, message: "Se ha eliminado correctamente el registro de la comida"})
    })
}