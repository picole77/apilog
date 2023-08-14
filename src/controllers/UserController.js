const { conexion }  = require('../database/conexion')
const { SELECT_ALL_USERS, DELETE_USER, UPDATE_USER } = require('../services/MysqlQueries')

exports.select_all_users = (req, res) => {
    conexion.query(SELECT_ALL_USERS, (err, results) => {
        if(err) {
            return res.status(405).json({status: false, message: "Ah ocurrido un error al obtener la lista de usuarios"})
        }

        res.status(200).json({ status: true, message: "Lista de usuarios", data: results })
    })
}
