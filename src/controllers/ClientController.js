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
    
}