const { conexion } = require('../database/conexion')
const { CREATE_ROL, SELECT_ROL, UPDATE_ROL, DELETE_ROL } = require('../services/MysqlQueries')

exports.create_rol = (req, res) => {
    const { tipo_usuario } = req.body
    // console.log(req.body);
    conexion.query(CREATE_ROL, [tipo_usuario], (error, results) => {
        if(error) {
            return res.status(500).json({status: false, message: "Error al crear el rol"})
        }

        return res.status(201).json({status: true, message: 'Se ha creado el rol correctamente'})
    })
}

exports.select_rols = (req, res) => {
    conexion.query(SELECT_ROL, (error, results) => {
        if(error) {
            return res.status(500).json({status: false, message: "Error al obtener la lista de roles"})
        }

        res.status(200).json({status: true, data: results})
    })
}

exports.update_rol = (req, res) => {
    const tipo_usuario = req.body
    const id = req.params.id

    conexion.query(UPDATE_ROL, [tipo_usuario, id], (error, results) => {
        if(error)
            return res.status(500).json({status: false, message: 'Error al actualizar el rol del usuario'})

        res.status(201).json({status: true, message: 'Se ha actualizado el rol correctamente'})
    })
}

exports.delete_rol = (req, res) => {
    const id = req.params.id

    conexion.query(DELETE_ROL, [id], (error, results) => {
        if(error)
            return res.status(500).json({status: false, message: 'Error al eliminar el rol de usuario'})

        res.status(201).json({status: true, message: 'Se ha eliminado el rol exitosamente'})
    })
}