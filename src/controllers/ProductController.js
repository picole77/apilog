const { formidable } = require('formidable')
const path = require('path')
const { conexion }  = require('../database/conexion')
const fs = require('fs')
const { isValidFile }  = require('../services/utils')
const { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SELECT_PRODUCT_ID,
     SELECT_PRODUCT, COUNT_PRODUCTS, SELECT_SEARCH_PRODUCT, UPDATE_MULTIPLE_PRODUCTS } = require('../services/MysqlQueries')

exports.create_product = (req, res) => {

    const uploadDir = path.join(__dirname, 'public', 'products')

    const form = formidable({ 
        multiples: true,
        maxFieldsSize: 50*1024*1024,
        uploadDir: uploadDir
    })

    form.parse(req, async (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                status: false,
                message: 'Error al procesar la solicitud',
                error: err
            })
        }
        console.log(files.file[0].mimetype);
        // insert single file
        if(files.file.length) {
        }
        const file = files.file[0]
        // const type = file.mimetype
        const isValid = isValidFile(file)

        const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g,'-'))

        if(!isValid) {
            return res.status(400).json({
                status: false,
                message: 'La imagen no tiene el fomato valido: jpg, png o jpeg'
            })
        }
        try {
            const exeption = String.raw`\a`
            console.log(`${uploadDir}${exeption}${fileName}`);
            // renames the file in the directory
            fs.renameSync(file.path, `${uploadDir}/${fileName}`);
        } catch (error) {
            console.log(error);
            return res.json({
                status: false,
                message: 'Error when try to save image'
            })
        }
        try {
            const newFile = await new File.create({
                name: `products/${fileName}`
            })

            console.log("Image save successfully");
        } catch (error) {
                console.log(error);
        }

        //access to filenames
        const codigo_barras = fields.codigo_barras[0]
        const nombre = fields.nombre[0]
        const descripcion = fields.descripcion[0]
        const precio_compra = fields.precio_compra[0]
        const precio_venta = fields.precio_venta[0]
        const caducidad = fields.caducidad[0]
        const stock = fields.stock[0]
        const imagen = fileName
        let caducidadDate = new Date(caducidad)

        // conexion.query(CREATE_PRODUCT, [codigo_barras, nombre, descripcion, precio_compra ,precio_venta, caducidadDate, stock, imagen], (error, results) => {
        //     if(error) {
        //         res.status(500).json({ "status": false, "message":"Ocurrió un error al crear el producto"})
        //         return
        //     }
        //     res.json({ "status": true, "message": "Producto creado exitosamente"})
        // })
    })
}

exports.update_product = (req, res) => {
    if(!req.body) {
        res.status(401).json({ "status": false, "message": "Ingrese todos los campos obligatorios"})
    }
    const id = req.params.id
    const {codigo_barras, nombre, descripcion, precio_compra, precio_venta, stock, imagen} = req.body
    
    conexion.query(UPDATE_PRODUCT, [codigo_barras, nombre, descripcion, precio_compra, precio_venta, new Date().getTime(), stock, 'imagen', id], (error, results) => {
        if(error) {
            res.status(409).json({ "status": false, "message":"Ocurrió un error al actualizar el producto"+error.message})
            return
        }
        res.json({ "status": true, "message": "Producto actualizado exitosamente"})
    })
}

exports.update_multiple_products = async (req, res) => {
    if(!req.body) {
        return res.status(401).json({status: false, message: "Error no insertó ningún producto"})
    }
    const products = req.body

    await products.forEach( product => {
        const update_at = new Date(product.fecha)
        const precio_compra = product.precio
        const stock = product.cantidad
        const id = product.id_producto
        
        conexion.query(UPDATE_MULTIPLE_PRODUCTS, [precio_compra, stock, update_at, id], (err, results) => {
            if(err) {
                console.log(err);
            }
            console.log(results);
        })
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
            res.status(409).json({ "status": false, "message":`Ocurrió un error al eliminar el producto`})
            return
        }
        
        res.json({ "status": true, "message": `Producto eliminado exitosamente`})
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