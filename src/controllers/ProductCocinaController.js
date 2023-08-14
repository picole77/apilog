const { conexion }  = require('../database/conexion')
const { SELECT_PRODUCT_COCINA } = require('../services/MysqlQueries')

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