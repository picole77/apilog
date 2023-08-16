
'use strict';

module.exports = (app) => {
    const authController  = require('../controllers/AuthController')
    const userController = require('../controllers/UserController')
    const productController = require('../controllers/ProductController');
    const salesController = require('../controllers/SalesController')
    const cocinaController = require('../controllers/CocinaController')
    const clientController = require('../controllers/ClientController')
    const pdfController = require('../controllers/PDFController')
    const productosCocinaController = require('../controllers/ProductCocinaController')
    const rolController = require('../controllers/RolController')
    // router para las vistas
    app.post('/login', authController.login)

    app.post('/register', authController.register)
    // usuarios

    app.get('/api/usuarios', userController.select_all_users)

    app.post('/api/articulos/', productController.create_product)
    
    app.put('/api/articulos/multiple', productController.update_multiple_products)
    
    app.put('/api/articulos/:productId', productController.update_product)
    
    app.delete('/api/articulos/:productId',productController.delete_product)

    app.post('/api/articulos/dates', productController.select_product_dates)
    
    app.get('/api/articulos', productController.select_product)

    app.post('/api/articulos/:productId', productController.select_product_by_id)
    // productos cocina
    app.get('/api/articulos/cocina', productosCocinaController.select_product_cocina)

    app.post('/api/articulos/cocina/crear', productosCocinaController.create_product_cocina)

    app.delete('/api/articulos/cocina/eliminar', productosCocinaController.delete_product_cocina)
    // rutas para guardar productos en cocina
    app.post('/api/cocina/registrar', cocinaController.create_cocina_product)
    
    app.put('/api/cocina/:id', cocinaController.update_cocina_product)

    app.delete('/api/cocina/:id', cocinaController.delete_cocina_product)

    app.post('/api/cocina/dates', cocinaController.select_cocina_dates)

    app.get('/api/cocina', cocinaController.select_cocina_product)
    // rutas para las ventas
    app.get('/api/ventas', salesController.select_sales)

    app.post('/api/ventas/registrar', salesController.register_sale)
    
    app.get('/api/ventas/:id', salesController.select_sale)
    
    app.post('/api/ventas/dates', salesController.select_sales_dates)
    
    app.put('/api/ventas/actualizar', salesController.update_sale)
    
    app.delete('/api/ventas/eliminar', salesController.delete_sale)
    // rutas para mostrar los clientes
    app.get('/api/clientes', clientController.select_all_clients)

    app.get('/api/pdf/cocina/:id', pdfController.pdf_cocina)
    // rutas para mostrar los pdfs
    app.get('/api/pdf/almacen/:id', pdfController.pdf_almacen)
    
    app.get('/api/pdf/venta/:id', pdfController.pdf_ventas)

    // rutas para mostrar los roles
    app.post('/api/rol/crear', rolController.create_rol)

    app.get('/api/rol', rolController.select_rols)

    app.put('/api/rol/actualizar', rolController.update_rol)

    app.delete('/api/rol/eliminar', rolController.delete_rol)
}
