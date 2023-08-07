// USERS
exports.SELECT_USER = "SELECT id, nombre_usuario, email, password, nombre_completo, imagen, rol_id FROM usuarios WHERE nombre_usuario = ? AND estatus = 1";
exports.CREATE_USER = "INSERT INTO usuarios (nombre_usuario, email, password, nombre_completo, numero_telefonico, address, imagen, rol_id) VALUES (?,?,?,?,?,?,?,?) ";
exports.UPDATE_USER = "UPDATE usuarios SET nombre_usuario = ?, email = ?, password = ?, nombre_completo = ?, imagen = ? WHERE id = ?"
exports.DELETE_USER = "UPDATE usuarios SET estatus = 0 WHERE id = ?"
// PRODUCTS
exports.SELECT_PRODUCT = "SELECT id, codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen FROM producto WHERE estatus = 1 LIMIT ? OFFSET ?";
exports.SELECT_PRODUCT_ID = "SELECT id, codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen FROM producto WHERE id = ? AND estatus = 1"
exports.UPDATE_PRODUCT = "UPDATE producto SET codigo_barras = ?, nombre = ?, descripcion = ?, precio_compra = ?, precio_venta = ?, caducidad = ?, stock = ?, imagen = ?, modificacion_fecha = NOW() WHERE id = ?";
exports.DELETE_PRODUCT = "UPDATE producto SET estatus = 0  WHERE id = ?";
exports.CREATE_PRODUCT = "INSERT INTO producto (codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen ) VALUES (?,?,?,?,?,?,?,?)";
exports.SELECT_SEARCH_PRODUCT = "SELECT id, codigo_barras, nombre, descripcion, precio_compra, precio_venta, caducidad, stock, imagen FROM producto WHERE (nombre LIKE ? OR codigo_barras LIKE ? ) AND estatus = 1 LIMIT ? OFFSET ? "
exports.COUNT_PRODUCTS = "SELECT COUNT(*) AS Total FROM producto WHERE estatus = 1"
exports.UPDATE_MULTIPLE_PRODUCTS = "UPDATE producto SET precio_compra = ?, stock = ?, modificacion_fecha = ? WHERE id = ?"
// COCINA
exports.SELECT_COCINA = "SELECT id, codigo_barras, nombre, precio, stock, estatus, imagen, caducidad, id_articulo FROM cocina WHERE estatus = 1 LIMIT ? OFFSET ?"
exports.SELECT_SEARCH_COCINA = "SELECT id, codigo_barras, nombre, precio, stock, estatus, imagen, caducidad, id_articulo FROM cocina WHERE estatus = 1 AND (codigo_barras LIKE ? OR nombre LIKE ? ) LIMIT ? OFFSET ?"
exports.COUNT_COCINA = "SELECT COUNT(*) AS Total FROM cocina WHERE estatus = 1"
exports.CREATE_COCINA = "INSERT INTO cocina (codigo_barras, nombre, precio, stock, imagen, caducidad, id_articulo) VALUES(?,?,?,?,?,?,?)"
exports.UPDATE_COCINA = "UPDATE cocina SET codigo_barras = ?, nombre = ?, precio = ?, stock = ?, imagen = ?, caducidad = ?, id_articulo = ? WHERE id = ?"
exports.DELETE_COCINA = "DELETE FROM cocina WHERE id = ?"
//SALES
exports.CREATE_SALE = "INSERT INTO venta (subtotal, descuento, total, id_usuario, client_id, voucher_id) VALUES (?,?,?,?,?,?)"
exports.SELECT_SALES = "SELECT v.id, v.subtotal, v.descuento, v.total, u.nombre_usuario, c.nombre AS cliente, vch.nombre as voucher, v.fecha FROM venta v INNER JOIN usuarios u ON u.id = v.usuario_id INNER JOIN cliente c ON c.id = v.cliente_id INNER JOIN voucher vch ON vch.id = v.voucher_id LIMIT ? OFFSET ?"
exports.SELECT_SEARCH_SALES = "SELECT v.id, v.subtotal, v.descuento, v.total, u.nombre_usuario, c.nombre AS cliente, vch.nombre as voucher, v.fecha FROM venta v INNER JOIN usuarios u ON u.id = v.usuario_id INNER JOIN cliente c ON c.id = v.cliente_id INNER JOIN voucher vch ON vch.id = v.voucher_id WHERE (v.id LIKE ? OR c.nombre LIKE ?)  LIMIT ? OFFSET ?"
exports.COUNT_SALES = "SELECT COUNT(*) AS TOTAL FROM venta"
exports.UPDATE_SALE = "UPDATE venta SET subtotal = ?, descuento = ?, total = ?, id_usuario = ?, client_id = ?, voucher_id = ? WHERE id = ?"
exports.DELETE_SALE = "DELETE FROM venta WHERE id = ?"
// SALES DETAILS
exports.CREATE_SALE_DETAILS = "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, amount) VALUES(?,?,?,?)"
exports.SELECT_SALE_DETAILS = "SELECT v.id, v.subtotal, v.impuesto_generado_venta, v.descuento, v.total, u.nombre_usuario, c.nombre AS cliente, vch.nombre AS voucher_name, dv.cantidad, dv.amount FROM venta INNER JOIN usuarios u ON u.id = v.id_usuario INNER JOIN cliente ON c.id = v.cliente_id INNER JOIN voucher vch ON vch.id = v.voucher_id INNER JOIN detalle_ventas dv ON dv.venta_id = v.id WHERE v.id = ?"
exports.UPDATE_SALE_DETAILS = "UPDATE detalle_ventas SET venta_id = ?, producto_id = ?, cantidad = ?, amount = ? WHERE venta_id = ? "
exports.DELETE_SALE_DETAILS = "DELETE FROM detalle_ventas WHERE venta_id = ?"
// CLIENTS
exports.CREATE_CLIENT = "INSERT INTO cliente (nombre, tipo_documento, num_documento, direccion, numero_tel, email) VALUES (?,?,?,?,?,?)"
exports.SELECT_ALL_CLIENTS = "SELECT id, nombre, tipo_documento, num_documento, direccion, numero_tel, email, fecha_creacion, fecha_modificacion FROM cliente WHERE estatus = 1 LIMIT ? OFFSET ?"
exports.COUNT_ALL_CLIENTS = "SELECT COUNT(*) AS TOTAL FROM cliente WHERE estatus = 1"
exports.SELECT_CLIENT = "SELECT id, nombre, tipo_documento, num_documento, direccion, numero_tel, email FROM cliente WHERE id = ? AND estatus = 1"
exports.UPDATE_CLIENT = "UPDATE cliente SET nombre = ?, tipo_documento = ?, num_documento = ?, direccion = ?, numero_tel = ?, email = ? WHERE id = ?"
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