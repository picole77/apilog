
const {conexion} = require('./conexion'); 
var express = require ('express');
var mysql = require('mysql');

var app = express();

var cors =require('cors');
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'))
app.use('/',require('./src/routes/router'))

const bcryptjs = require('bcryptjs');

const session = require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));









//prueba de conexion
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Connexion exitosa");
    }
});

app.get('/', function(req, res){
    res.send('ruta de inicio');
});

//mostrar articulos
app.get('/api/articulos/', (req,res)=>{
    conexion.query('SELECT * FROM articulos',(error,filas)=>{
        if(error){
            throw error;
            return 
        }else{
            res.json(filas);
        }
    });
});

//mostrar un solo articulo
app.get('/api/articulos/:id', (req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id = ?',[req.params.id],(error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].descripcion);
        }
    });
});

//crear un articulo
app.post('/api/articulos', (req, res)=>{
    let data ={descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }

    });
});

//editar articulo

app.put('/api/articulos/:id', (req, res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, stock, id], function (error, results) {
        if(error){
            throw error;
            return
        }else{
            res.send(results);
        }
    });
});


//eliminar articulo
app.delete('/api/articulos/:id',(req,res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?',[req.params.id], function(error, filas){
    if(error){
        throw error;
        return 
    }else{
        res.send(filas);
    }
    });
});



const puerto = process.env.PUERTO || 3000;

app.listen (puerto, function(){
    console.log("servidor es ok en puerto: "+puerto);
});