
'use strict';

module.exports = (app) => {
    const authController  = require('../controllers/AuthController')
    const productController = require('../controllers/ProductController');
    
    // router para las vistas
    app.post('/login', authController.login)

    app.post('/register', authController.register)
    
    app.post('/products/create', productController.create_product)
    
    app.put('/products/:productId', productController.update_product)
    
    app.delete('/products/:productId',productController.delete_product)

    app.get('/products/list', productController.select_product)

}
