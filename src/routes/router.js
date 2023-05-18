
'use strict';

module.exports = (app) => {
    const authController  = require('../controllers/AuthController')
    const productController = require('../controllers/ProductController');
    
    // router para las vistas
    app.router('/login')
    .post(authController.login)

    app.router('/register')
    .post(authController.register)
    
    app.router('/products/create')
    .post(productController.create_product)
    
    app.router('/products/:productId')
    .put(productController.update_product)
    .delete(productController.delete_product)

    app.router('/products/list')
    .get(productController.select_product)

}
