const { conexion }  = require('../database/conexion')
const { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,
     SELECT_PRODUCT, COUNT_PRODUCTS, SELECT_SEARCH_PRODUCT } = require('../services/MysqlQueries')

exports.create_product = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    const { descripcion, precio, stock } = req.body
    const usuario = 1
    conexion.query(CREATE_PRODUCT, [descripcion,precio, stock, usuario], (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":"Ocurrió un error al crear el producto"})
            return
        }
        res.json({ "status": true, "message": "Producto creado exitosamente"})
    })
}

exports.update_product = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    const id = req.body.id
    const product = req.body.product

    conexion.query(UPDATE_PRODUCT, [product, id], (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":"Ocurrió un error al actualizar el producto"})
            return
        }
        res.json({ "status": true, "message": "Producto actualizado exitosamente"})
    })
}

exports.delete_product = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    const id  = req.body.id
    conexion.query(DELETE_PRODUCT, [id], (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":"Ocurrió un error al eliminar el producto"})
            return
        }
        res.json({ "status": true, "message": "Producto eliminado exitosamente"})
    })
}

exports.select_product = (req, res) => {
    //pagination
    const page = parseInt(req.query.page) ?? 1
    const limit = parseInt(req.query.limit) ?? 25
    const search = req.query.search ?? ''

    const QUERY = search === '' ? SELECT_PRODUCT : SELECT_SEARCH_PRODUCT

    const offset = (page - 1) * limit

    const PARAMS = search === '' ? [limit, offset] : [ `%${search}%`, `%${search}%`,limit, offset] 

    conexion.query(COUNT_PRODUCTS, (error, results) => {
        if(error) {
            console.log(error.message);
            return
        }
        //total pages and rows
        const totalRows = results[0].Total
        const totalPages = Math.ceil(totalRows / limit)

        conexion.query(QUERY, PARAMS, (error, results) => {
            if(error) {
                res.status(409).json({ "status": false, "message":"Ocurrió un error al crear el producto"})
                return
            }
            res.json({ "status": true, "message": "Producto creado exitosamente", "pageSize": limit, "currentPage": page, "pages": totalPages, "data": results})
        })
    })
}