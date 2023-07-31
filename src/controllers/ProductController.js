const { conexion }  = require('../database/conexion')
const { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SELECT_PRODUCT_ID,
     SELECT_PRODUCT, COUNT_PRODUCTS, SELECT_SEARCH_PRODUCT } = require('../services/MysqlQueries')

exports.create_product = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    const {codigo_barras, nombre, descripcion, precio_compra, precio_venta, stock, imagen} = req.body
    const usuario = 1
    conexion.query(CREATE_PRODUCT, [codigo_barras, nombre, descripcion, precio_compra ,precio_venta, stock, "producto.png"], (error, results) => {
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
    const {codigo_barras, nombre, descripcion, precio_compra, precio_venta, stock, imagen} = req.body
    
    conexion.query(UPDATE_PRODUCT, [codigo_barras, nombre, descripcion, precio_compra, precio_venta, stock, imagen, id], (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":"Ocurrió un error al actualizar el producto"})
            return
        }
        res.json({ "status": true, "message": "Producto actualizado exitosamente"})
    })
}

exports.delete_product = (req, res) => {
    if(!req.params) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    // req.params.id /articulos/4
    // req.query.id /articulos?id=4
    // req.body.id /articulos body: JSON.stringify({id: 4})
    let id = req.params.productId
    id = parseInt(id)
    // console.log(req.params);
    conexion.query(DELETE_PRODUCT, [id], (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":`Ocurrió un error al eliminar el producto ${error}`})
            return
        }
        console.log(results);
        res.json({ "status": true, "message": `Producto eliminado exitosamente ${results}`})
    })
}

exports.select_product = (req, res) => {
    //pagination
    let page = req.query.page ?? 1
    let limit = req.query.limit ?? 25
    const search = req.query.search ?? ''
    // parse elements to int when value is string
    page = parseInt(page)
    limit = parseInt(limit)

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
                res.status(409).json({ "status": false, "message":`Ocurrió un error al buscar el producto ${error}`})
                return
            }
            res.json({ "status": true, "message": "Resultados", "pageSize": limit, "currentPage": page, "pages": totalPages, "data": results})
        })
    })
}

exports.select_product_by_id = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    
    const id = req.params.productId

    conexion.query(SELECT_PRODUCT_ID, [id], (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":"Ocurrió un error al eliminar el producto"})
            return
        }
        res.json({ "status": true, "data": results})
    })
}