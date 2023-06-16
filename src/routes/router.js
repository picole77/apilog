
'use strict';

module.exports = (app) => {
    const authController  = require('../controllers/AuthController')
    const productController = require('../controllers/ProductController');
    
    // router para las vistas
    app.post('/login', authController.login)

    app.post('/register', authController.register)
    
    app.post('/api/articulos/', productController.create_product)
    
    app.put('/api/articulos/:productId', productController.update_product)
    
    app.delete('/api/articulos/:productId',productController.delete_product)

    app.get('/api/articulos', productController.select_product)

}
