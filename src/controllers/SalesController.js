const { conexion } = require('../database/conexion')
const { CREATE_SALE, SELECT_SALES, SELECT_SEARCH_SALES, UPDATE_SALE, DELETE_SALE, COUNT_SALES } = require('../services/MysqlQueries')

/**
 * Procedimiento para registrar las ventas
 */
exports.register_sale = async (req, res) => {
    try {
        // const {cantidad, descripcion, precio, id_producto, fecha, hora, id_usuario} = req.body
        const salesArray = req.body
        conexion.query(CREATE_SALE, salesArray, (error, results) => {
            if(error){
                throw new Error(error)
                return
            }
            res.json({"status": true, "message": "La venta se ha registrado correctamente"})
        })

    } catch(error) {
        console.log(error);
    }
}
/**
 * Actualización de una venta en caso de requerirse
 */
exports.update_sale = (req, res) => {
    try {
        const { cantidad, descripcion, precio, codigo_barras, fecha, hora, id_usuario, id_venta} = req.body
        conexion.query(UPDATE_SALE, [descripcion, cantidad, precio, codigo_barras, fecha, hora, id_usuario, id_venta], (error, result) => {
            if(error) {
                console.log(error)
                return
            }
            res.json({"status": true, "message": "Se actualizó correctamente"})
        })
    } catch (error) {
        console.log(error);
    }
}
/**
 * Eliminación de un artículo en caso de requerirse
 */
exports.delete_sale = (req, res) => {
    try {
        
        const {id_venta} = req.body
        conexion.query(DELETE_SALE, [id_venta], (error, results) => {
            if(error) {
                console.log(error);
                return
            }
            res.json({"status": true, "message": "Se ha eliminado correctamente"})
        })

    } catch (error) {
        console.log(error);
    }
}
/**
 * Lista de todas las ventas registradas hasta el momento
 */
exports.select_sales = (req, res) => {
    try {
        const PAGE = parseInt(req.query.page) ?? 1
        const LIMIT = parseInt(req.query.limit) ?? 25
        const SEARCH = req.query.search ?? ''

        const QUERY_OPTION = SEARCH === '' ? SELECT_SALES : SELECT_SEARCH_SALES

        const OFFSET = (PAGE - 1)* LIMIT

        const PARAMS = SEARCH === '' ? [LIMIT, OFFSET] : [ `%${SEARCH}%`, `%${SEARCH}%`, LIMIT, OFFSET]

        conexion.query(COUNT_SALES, (error, results) => {
            if(error) {
                console.log(error);
                return
            }
            const TOTAL_ROWS = results[0].TOTAL

            const TOTAL_PAGES = Math.ceil(TOTAL_ROWS / LIMIT)

            conexion.query(QUERY_OPTION, PARAMS, (error, results) => {
                if(error) {
                    res.sttus(409).json({"status": false, "message": "Ocurrió un error al realizar la búsqueda"})
                }
                res.json({ "status": true, "message": "Búsqueda realizada correctamente", "pageSize": LIMIT, "currentPage": PAGE, "pages": TOTAL_PAGES, "data": results})
            })
        })
    } catch (error) {
        console.log(error);
    }
}