
const mysql = require ('mysql');

exports.conexion = mysql.createConnection ({
    host:'localhost',
      user:'root',
      password:'',
      database:'articulosdb',
      port:'3310'
  });