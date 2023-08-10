
'use strict';

module.exports = (app) => {
    const authController  = require('../controllers/AuthController')
    const productController = require('../controllers/ProductController');
    const salesController = require('../controllers/SalesController')
    const cocinaController = require('../controllers/CocinaController')
    const clientController = require('../controllers/ClientController')
    const pdfController = require('../controllers/PDFController')
    // router para las vistas
    app.post('/login', authController.login)

    app.post('/register', authController.register)
    
    app.post('/api/articulos/', productController.create_product)
    
    app.put('/api/articulos/multiple', productController.update_multiple_products)
    
    app.put('/api/articulos/:productId', productController.update_product)
    
    app.delete('/api/articulos/:productId',productController.delete_product)

    app.post('/api/articulos/dates', productController.select_product_dates)
    
    app.get('/api/articulos', productController.select_product)

    app.post('/api/articulos/:productId', productController.select_product_by_id)

    // rutas para guardar productos en cocina
    app.post('/api/cocina/registrar', cocinaController.create_cocina_product)
    
    app.put('/api/cocina/:id', cocinaController.update_cocina_product)

    app.delete('/api/cocina/:id', cocinaController.delete_cocina_product)

    app.get('/api/cocina', cocinaController.select_cocina_product)
    // rutas para las ventas
    app.get('/api/ventas', salesController.select_sales)

    app.get('/api/ventas/:id', salesController.select_sale)

    app.post('/api/ventas/dates', salesController.select_sales_dates)

    app.post('/api/ventas/registrar', salesController.register_sale)

    app.put('/api/ventas/actualizar', salesController.update_sale)

    app.delete('/api/ventas/eliminar', salesController.delete_sale)
    // rutas para mostrar los clientes
    app.get('/api/clientes', clientController.select_all_clients)
    // rutas para mostrar los pdfs
    app.get('/api/pdf/venta/:id', pdfController.pdf_ventas)

    app.get('/api/pdf/almacen/:id', pdfController.pdf_almacen)
}
