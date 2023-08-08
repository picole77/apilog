const fs = require('fs')
const { conexion }  = require('../database/conexion')
const { CREATE_COCINA, UPDATE_COCINA, DELETE_COCINA,
     SELECT_COCINA, COUNT_COCINA, SELECT_SEARCH_COCINA } = require('../services/MysqlQueries')

exports.create_cocina_product = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    let productos = []
    
    productos = req.body
    
    productos.forEach( product => {
        const caducidadDate = new Date(product.caducidad)

        conexion.query(CREATE_COCINA, [product.codigo_barras, product.nombre, product.precio, product.stock , product.imagen, caducidadDate, product.id_articulo, product.id_usuario, product.id_cliente], (error, results) => {
            if(error) {
                res.status(500).json({ "status": false, "message":"Ocurrió un error al crear el producto"})
                return
            }
        })
    })
    res.json({ "status": true, "message": "Productos creados exitosamente"})

}

exports.update_cocina_product = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    const id = req.params.id
    const {codigo_barras, nombre, descripcion, precio_compra, precio_venta, stock, imagen, id_usuario, id_cliente} = req.body
    
    conexion.query(UPDATE_COCINA, [codigo_barras, nombre, descripcion, precio_compra, precio_venta, new Date().getTime(), stock, 'imagen',id_usuario, id_cliente, id], (error, results) => {
        if(error) {
            res.status(401).json({ "status": false, "message":"Ocurrió un error al actualizar el producto"+error.message})
            return
        }
        res.status(201).json({ "status": true, "message": "Producto actualizado exitosamente"})
    })
}

exports.delete_cocina_product = (req, res) => {
    if(!req.params) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    // req.params.id /articulos/4
    // req.query.id /articulos?id=4
    // req.body.id /articulos body: JSON.stringify({id: 4})
    let id = req.params.productId
    id = parseInt(id)
    // console.log(req.params);
    conexion.query(DELETE_COCINA, [id], (error, results) => {
        if(error) {
            return res.status(409).json({ "status": false, "message":`Ocurrió un error al eliminar el producto`})
        }
        
        res.json({ "status": true, "message": `Producto eliminado exitosamente`})
    })
}

exports.select_cocina_product = (req, res) => {
    //pagination
    let page = req.query.page ?? 1
    let limit = req.query.limit ?? 25
    const search = req.query.search ?? ''
    // parse elements to int when value is string
    page = parseInt(page)
    limit = parseInt(limit)

    const QUERY = search === '' ? SELECT_COCINA : SELECT_SEARCH_COCINA

    const offset = (page - 1) * limit

    const PARAMS = search === '' ? [limit, offset] : [ `%${search}%`, `%${search}%`,limit, offset] 

    conexion.query(COUNT_COCINA, (error, results) => {
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
            res.status(200).json({ "status": true, "message": "Resultados", "pageSize": limit, "currentPage": page, "pages": totalPages, "data": results})
        })
    })
}

exports.select_cocina_product_by_id = (req, res) => {
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