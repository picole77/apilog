// USERS
exports.SELECT_USER = "SELECT id, nombre_usuario, email, password, nombre_completo, imagen FROM usuarios WHERE nombre_usuario = ?";
exports.CREATE_USER = "INSERT INTO usuarios (nombre_usuario, email, password, nombre_completo, numero_telefonico, address, imagen, rol_id) VALUES (?,?,?,?,?,?,?,?) ";
// PRODUCTS
exports.SELECT_PRODUCT = "SELECT id, codigo_barras, nombre, descripcion, precio_compra, precio_venta, stock, imagen FROM producto LIMIT ? OFFSET ?";
exports.UPDATE_PRODUCT = "UPDATE articulos SET descripcion = ?, precio = ?, stock= ?, usuario=? WHERE id = ?";
exports.DELETE_PRODUCT = "DELETE FROM articulos  WHERE id = ?";
exports.CREATE_PRODUCT = "INSERT INTO articulos (descripcion, precio, stock, usuario) VALUES (?,?,?,?)";
exports.SELECT_SEARCH_PRODUCT = "SELECT id, codigo_barras, nombre, descripcion,precio_compra, precio_venta, stock, imagen FROM producto WHERE (id LIKE ?  descripcion LIKE ? ) LIMIT ? OFFSET ? "
exports.COUNT_PRODUCTS = "SELECT COUNT(*) AS Total FROM producto"
//SALES
exports.CREATE_SALE = "INSERT INTO ventas (cantidad, descripcion, precio, codigo_barras, id_producto, fecha, hora, id_usuario) VALUES ?"
exports.SELECT_SALES = "SELECT id_venta, cantidad, descripcion, precio, codigo_barras, fecha, hora, usuario.username AS usuario"+
                       "INNER JOIN usuarios ON usuario.id = ventas.id_usuario LIMIT ? OFFSET ?"
exports.SELECT_SEARCH_SALES = "SELECT id_venta, cantidad, descripcion, precio, codigo_barras, fecha, hora, usuario.username AS usuario"+
"INNER JOIN usuarios ON usuario.id = ventas.id_usuario WHERE (codigo_barras LIKE ? OR descripcion LIKE ? )"
+"LIMIT ? OFFSET ?"
exports.COUNT_SALES = "SELECT COUNT(*) AS TOTAL FROM ventas"
exports.UPDATE_SALE = "UPDATE ventas SET descripcion = ?, cantidad = ?, precio = ?, codigo_barras = ?, fecha = ?, hora = ?, id_usuario = ? WHERE id_venta = ?"
exports.DELETE_SALE = "DELETE FROM ventas WHERE id_venta = ?"