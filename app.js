
// Importaciones siempre al principio
const dotenv = require('dotenv');
const express = require ('express');
const cors =require('cors');
const app = express();
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const routes = require('./src/routes/router')

// Implementaciones o inicializaciones
dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const dirName = require('path').join('public/')

app.use(express.static(dirName));

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

routes(app);
// rutas no validas se redireccionaran a la raíz
app.get('*', (req, res) => {
    res.redirect('/')
})

const port = process.env.PORT || 3000;

app.listen(port);

console.log("API REST started on port " + port);