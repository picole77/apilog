// USERS
exports.SELECT_USER = "SELECT id, nombre_usuario, email, password, nombre_completo, imagen, rol_id FROM usuarios WHERE nombre_usuario = ? AND estatus = 1";
exports.SELECT_ALL_USERS = "SELECT id, nombre_usuario, email, password, nombre_completo, imagen, rol_id, estatus FROM usuarios"
exports.CREATE_USER = "INSERT INTO usuarios (nombre_usuario, email, password, nombre_completo, numero_telefonico, address, imagen, rol_id) VALUES (?,?,?,?,?,?,?,?) ";
exports.UPDATE_USER = "UPDATE usuarios SET nombre_usuario = ?, email = ?, password = ?, nombre_completo = ?, imagen = ? WHERE id = ?"
exports.DELETE_USER = "UPDATE usuarios SET estatus = 0 WHERE id = ?"
// PRODUCTS
exports.SELECT_PRODUCT = "SELECT id, codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen FROM producto WHERE estatus = 1 LIMIT ? OFFSET ?";
exports.SELECT_PRODUCT_ID = "SELECT id, codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen, creacion_fecha FROM producto WHERE id = ? AND estatus = 1"
exports.SELECT_PRODUCT_DATES = "SELECT id, codigo_barras, nombre, descripcion, creacion_fecha AS fecha, stock FROM producto WHERE DATE_FORMAT(creacion_fecha, '%Y-%m-%d') BETWEEN ? AND ? "
exports.UPDATE_PRODUCT = "UPDATE producto SET codigo_barras = ?, nombre = ?, descripcion = ?, precio_compra = ?, precio_venta = ?, caducidad = ?, stock = ?, imagen = ?, modificacion_fecha = NOW() WHERE id = ?";
exports.DELETE_PRODUCT = "UPDATE producto SET estatus = 0  WHERE id = ?";
exports.CREATE_PRODUCT = "INSERT INTO producto (codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen, creacion_fecha ) VALUES (?,?,?,?,?,?,?,?, NOW())";
exports.SELECT_SEARCH_PRODUCT = "SELECT id, codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen FROM producto WHERE (nombre LIKE ? OR codigo_barras LIKE ? ) AND estatus = 1 LIMIT ? OFFSET ? "
exports.COUNT_PRODUCTS = "SELECT COUNT(*) AS Total FROM producto WHERE estatus = 1"
exports.UPDATE_MULTIPLE_PRODUCTS = "UPDATE producto SET precio_compra = ?, stock = ?, modificacion_fecha = ? WHERE id = ?"
// PRODUCTS COCINA
exports.SELECT_PRODUCT_COCINA = "SELECT id, nombre, descripcion, precio, created_at FROM producto_cocina"
exports.CREATE_PRODUCT_COCINA = "INSERT INTO producto_cocina (nombre, descripcion, precio, created_at) VALUES (?,?,?,NOW())"
exports.UPDATE_PRODUCT_COCINA = "UPDATE producto_cocina SET nombre = ?, descripcion = ?, precio = ? , updated_at = NOW() WHERE id = ?"
exports.DELETE_PRODUCT_COCINA = "DELETE FROM producto_cocina WHERE id = ?"
// COCINA
exports.SELECT_COCINA = "SELECT c.id, c.codigo_barras, c.nombre, c.created_at, c.precio, c.stock, c.estatus, c.imagen, c.caducidad, p.nombre as producto, u.nombre_usuario as usuario, cl.tipo_cliente as cliente FROM cocina c INNER JOIN cliente cl ON cl.id = c.id_cliente INNER JOIN usuarios u ON u.id = c.id_usuario INNER JOIN producto p ON p.id = c.id_articulo WHERE c.estatus = 1 LIMIT ? OFFSET ?"
exports.SELECT_SEARCH_COCINA = "SELECT c.id, c.codigo_barras, c.nombre, c.created_at,c.precio, c.stock, c.estatus, c.imagen, c.caducidad, p.nombre as producto, u.nombre_usuario as usuario, cl.tipo_cliente as cliente FROM cocina c INNER JOIN cliente cl ON cl.id = c.id_cliente INNER JOIN usuarios u ON u.id = c.id_usuario INNER JOIN producto p ON p.id = c.id_articulo WHERE c.estatus = 1 AND (c.codigo_barras LIKE ? OR c.nombre LIKE ? ) LIMIT ? OFFSET ?"
exports.SELECT_COCINA_DATES = "SELECT c.id, c.codigo_barras, c.nombre, c.created_at, c.precio, c.stock, c.estatus, c.imagen, c.caducidad, p.nombre as producto, u.nombre_usuario as usuario, cl.tipo_cliente as cliente FROM cocina c INNER JOIN cliente cl ON cl.id = c.id_cliente INNER JOIN usuarios u ON u.id = c.id_usuario INNER JOIN producto p ON p.id = c.id_articulo WHERE c.estatus = 1 AND DATE_FORMAT(c.created_at, '%Y-%m-%d') BETWEEN ? AND ?"
exports.SELECT_COCINA_ID = "SELECT c.id, c.codigo_barras, c.nombre, c.created_at, c.precio, c.stock, c.estatus, c.imagen, c.caducidad, p.nombre as producto, u.nombre_usuario as usuario, cl.tipo_cliente as cliente FROM cocina c INNER JOIN cliente cl ON cl.id = c.id_cliente INNER JOIN usuarios u ON u.id = c.id_usuario INNER JOIN producto p ON p.id = c.id_articulo WHERE c.estatus = 1 AND c.id = ?"
exports.COUNT_COCINA = "SELECT COUNT(*) AS Total FROM cocina WHERE estatus = 1"
exports.CREATE_COCINA = "INSERT INTO cocina (codigo_barras, nombre, precio, stock, imagen, caducidad, id_articulo, id_usuario, id_cliente) VALUES(?,?,?,?,?,?,?,?,?)"
exports.UPDATE_COCINA = "UPDATE cocina SET codigo_barras = ?, nombre = ?, precio = ?, stock = ?, imagen = ?, caducidad = ?, id_articulo = ?, id_usuario = ?, id_cliente = ? WHERE id = ?"
exports.DELETE_COCINA = "DELETE FROM cocina WHERE id = ?"
//SALES
exports.CREATE_SALE = "INSERT INTO venta (descuento, total, usuario_id, cliente_id, tipo_venta, tipo_cliente, fecha) VALUES (?,?,?,?,?,?,NOW())"
exports.SELECT_SALES = "SELECT v.id, v.descuento, v.total, u.nombre_usuario, p.nombre, v.tipo_venta, v.fecha, v.tipo_cliente, dv.amount as precio, dv.cantidad FROM venta v INNER JOIN usuarios u ON u.id = v.usuario_id INNER JOIN cliente c ON c.id = v.cliente_id INNER JOIN detalle_ventas dv ON dv.venta_id = v.id INNER JOIN producto p ON dv.producto_id = p.id LIMIT ? OFFSET ?"
exports.SELECT_SEARCH_SALES = "SELECT v.id, v.descuento, v.total, u.nombre_usuario, v.tipo_venta, v.fecha, v.tipo_cliente FROM venta v INNER JOIN usuarios u ON u.id = v.usuario_id INNER JOIN cliente c ON c.id = v.cliente_id WHERE (v.id LIKE ? OR c.nombre LIKE ?)  LIMIT ? OFFSET ?"
exports.SEARCH_SALE_DATES = "SELECT v.id, v.descuento, v.total, u.nombre_usuario, v.tipo_venta, v.fecha, v.tipo_cliente FROM venta v INNER JOIN usuarios u ON u.id = v.usuario_id INNER JOIN cliente c ON c.id = v.cliente_id WHERE DATE_FORMAT(v.fecha, '%Y-%m-%d') BETWEEN ? AND ?"
exports.SEARCH_SALE = "SELECT v.id, v.descuento, v.total, u.nombre_usuario, v.tipo_venta, v.fecha, v.tipo_cliente FROM venta v INNER JOIN usuarios u ON u.id = v.usuario_id INNER JOIN cliente c ON c.id = v.cliente_id WHERE v.id = ?"
exports.COUNT_SALES = "SELECT COUNT(*) AS TOTAL FROM venta"
exports.UPDATE_SALE = "UPDATE venta SET descuento = ?, total = ?, usuario_id = ?, cliente_id = ?, tipo_venta = ?, tipo_cliente = ? WHERE id = ?"
exports.DELETE_SALE = "DELETE FROM venta WHERE id = ?"
// SALES DETAILS
exports.CREATE_SALE_DETAILS = "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, amount) VALUES(?,?,?,?)"
exports.SELECT_SALE_DETAILS = "SELECT v.id, v.descuento, v.total, u.nombre_usuario, v.tipo_venta, v.tipo_cliente, dv.cantidad, dv.amount FROM venta v INNER JOIN usuarios u ON u.id = v.usuario_id INNER JOIN cliente c ON c.id = v.cliente_id INNER JOIN detalle_ventas dv ON dv.venta_id = v.id WHERE v.id = ?"
exports.UPDATE_SALE_DETAILS = "UPDATE detalle_ventas SET venta_id = ?, producto_id = ?, cantidad = ?, amount = ? WHERE venta_id = ? "
exports.DELETE_SALE_DETAILS = "DELETE FROM detalle_ventas WHERE venta_id = ?"
// SALES COMIDA
exports.CREATE_SALE_DETAILS_COMIDA = "INSERT INTO detalle_ventas_comida (venta_id, product_id, cantidad, amount) VALUES(?,?,?,?)"
// CLIENTS
exports.CREATE_CLIENT = "INSERT INTO cliente (tipo_cliente) VALUES (?)"
exports.SELECT_ALL_CLIENTS = "SELECT id, tipo_cliente, fecha_creacion, fecha_modificacion FROM cliente WHERE estatus = 1 LIMIT ? OFFSET ?"
exports.COUNT_ALL_CLIENTS = "SELECT COUNT(*) AS TOTAL FROM cliente WHERE estatus = 1"
exports.SELECT_CLIENT = "SELECT id, tipo_cliente FROM cliente WHERE id = ? AND estatus = 1"
exports.UPDATE_CLIENT = "UPDATE cliente SET tipo_cliente = ? WHERE id = ?"
exports.DELETE_CLIENT = "UPDATE cliente SET estatus = 0 WHERE id = ?"
// VOUCHER
exports.CREATE_VOUCHER = "INSERT INTO voucher (nombre, igv) VALUES(?,?)"
exports.SELECT_VOUCHER = "SELECT nombre, igv FROM voucher WHERE id = ?"
exports.UPDATE_VOUCHER = "UPDATE voucher SET nombre = ?, igv = ? WHERE id = ?"
exports.DELETE_VOUCHER = "DELETE FROM voucher WHERE id = ?"
// PROVIDER
exports.CREATE_PROVIDER = "INSERT INTO proveedor (nombre, reg_uni_contri, numero_telefonico, email) VALUES(?,?,?,?)"
exports.SELECT_PROVIDER = "SELECT id, nombre, reg_uni_contri, numero_telefonico, email, fecha_creacion, fecha_modificacion FROM proveedor WHERE estatus = 1 LIMIT ? OFFSET ?"
exports.UPDATE_PROVIDER = "UPDATE proveedor SET nombre = ?, reg_uni_contri = ?, numero_telefonico = ?, email = ? WHERE id = ?"
exports.DELETE_PROVIDER = "UPDATE proveedor SET estatus = 0 WHERE id = ?"
// SHOPPING
exports.CREATE_SHOPPING = "INSERT INTO compras (subtotal, impu_general_ventas, total, usuario_id, proveedor_id, voucher_id) VALUES(?,?,?,?,?,?)"
exports.SELECT_SHOPPING = "SELECT c.id, c.subtotal, c.impu_general_ventas, c.total, u.nombre_usuario, p.nombre AS proveedor, v.nombre AS voucher FROM compras c INNER JOIN usuarios u ON u.id = c.usuario_id INNER JOIN proveedor p ON p.id = c.proveedor_id INNER JOIN voucher v ON v.id = c.voucher_id LIMIT ? OFFSET ?"
exports.COUNT_SHOPPING = "SELECT COUNT(c.id) AS TOTAL FROM compras c INNER JOIN usuarios u ON u.id = usuario_id INNER JOIN proveedor p ON p.id = c.proveedor_id INNER JOIN voucher v ON v.id = c.voucher_id"
exports.UPDATE_SHOPPING = "UPDATE compras SET subtotal = ?, impu_general_ventas = ?, total = ?, usuario_id = ?, proveedor_id = ?, voucher_id = ? WHERE id = ?"
exports.DELETE_SHOPPING = "DELETE FROM compras WHERE id = ?"
// SHOPPING DETAILS
exports.CREATE_SHOPPING_DETAILS = "INSERT INTO detalle_compras (compras_id, producto_id, cantidad, amount) VALUES(?,?,?,?)"
exports.SELECT_SHOPPING_DETAILS = "SELECT compras_id, producto_id, cantidad, amount FROM detalle_compras LIMIT ? OFFSET ?"
exports.UPDATE_SHOPPING_DETAILS = "UPDATE detalle_compras SET compras_id = ?, producto_id = ?, cantidad = ?, amount = ? WHERE id = ?"
exports.DELETE_SHOPPING_DETAILS = "DELETE FROM detalle_compras WHERE id = ?"
// CATEGORY
exports.CREATE_CATEGORY = "INSERT INTO categoria (nombre, descripcion) VALUES(?,?)"
exports.SELECT_CATEGORY = "SELECT nombre, descripcion FROM categoria LIMIT ? OFFSET ?"
exports.UPDATE_CATEGORY = "UPDATE categoria SET nombre = ?, descripcion = ?, fecha_modificacion = NOW() WHERE id = ?"
exports.DELETE_CATEGORY = "UPDATE categoria SET estatus = 0 WHERE id = ?"
// ROLES
exports.CREATE_ROL = "INSERT INTO rol (tipo_usuario) VALUES (?)"
exports.SELECT_ROL = "SELECT id, tipo_usuario FROM rol"
exports.DELETE_ROL = "DELETE FROM rol WHERE id = ?"
exports.UPDATE_ROL = "UPDATE rol SET tipo_usuario = ? WHERE id = ?"
