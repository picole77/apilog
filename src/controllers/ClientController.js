const { conexion }  = require('../database/conexion')

const { CREATE_CLIENT, SELECT_ALL_CLIENTS, DELETE_CLIENT, UPDATE_CLIENT, COUNT_ALL_CLIENTS, SELECT_CLIENT } = require('../services/MysqlQueries')

exports.create_client = (req, res) => {
    const { nombre, tipo_documento, num_documento, direccion, numero_tel, email } = req.body

    conexion.query(CREATE_CLIENT, [nombre, tipo_documento, num_documento, direccion, numero_tel, email], (error, results) => {
        if(error) {
            return res.status(500).json({ status: false, message: "Ah ocurrido un error al guardar su registro."})
        }

        res.status(201).json({status: true, message: "Se ha registrado correctamente el cliente"})
    })
}

exports.select_all_clients = (req, res) => {
    let page = req.query.page ?? 1
    let limit = req.query.limit ?? 25
    const id = req.query.id ?? ''

    page = parseInt(page)
    limit = parseInt(limit)

    const QUERY = id === '' ? SELECT_ALL_CLIENTS : SELECT_CLIENT

    const offset = (page - 1) * limit

    const PARAMS = id === '' ? [limit, offset] : [ id ] 

    conexion.query(COUNT_ALL_CLIENTS, (error, results) => {
        if(error) {
            return res.status(500).json({status: false, message: 'Error al contar el total de clientes'})
        }

        const totalRows = results[0].TOTAL
        const totalPages = Math.ceil(totalRows / limit)

        conexion.query(QUERY, PARAMS, (error, results) => {
            if(error) {
                console.log(error);
                return res.status(400).json({status: false, message: 'Error al obtener la lista de clientes'})
            }
            res.status(200).json({status: true, message: 'Resultados', pageSize: limit, currentPage: page, pages: totalPages, data: results })
        })
    })
}