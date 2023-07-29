
'use strict';

module.exports = (app) => {
    const authController  = require('../controllers/AuthController')
    const productController = require('../controllers/ProductController');
    const salesController = require('../controllers/SalesController')
    
    // router para las vistas
    app.post('/login', authController.login)

    app.post('/register', authController.register)
    
    app.post('/api/articulos/', productController.create_product)
    
    app.put('/api/articulos/:productId', productController.update_product)
    
    app.delete('/api/articulos/:productId',productController.delete_product)

    app.get('/api/articulos', productController.select_product)

    app.get('/api/articulos/:productId', productController.select_product_by_id)
    // rutas para las ventas
    app.get('/api/ventas', salesController.select_sales)

    app.post('/api/ventas/registrar', salesController.register_sale)

    app.put('/api/ventas/actualizar', salesController.update_sale)

    app.delete('/api/ventas/eliminar', salesController.delete_sale)
}
