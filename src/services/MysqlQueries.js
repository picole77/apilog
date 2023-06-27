// USERS
exports.SELECT_USER = "SELECT id, username, nombre, password FROM usuarios WHERE username = ?";
exports.CREATE_USER = "INSERT INTO usuarios (nombre, username, correo, password, rol) VALUES (?,?,?,?,?) ";
// PRODUCTS
exports.SELECT_PRODUCT = "SELECT id, descripcion, precio, stock, creacion, usuario FROM articulos LIMIT ? OFFSET ?";
exports.UPDATE_PRODUCT = "UPDATE articulos SET descripcion = ?, precio = ?, stock= ?, usuario=? WHERE id = ?";
exports.DELETE_PRODUCT = "DELETE FROM articulos  WHERE id = ?";
exports.CREATE_PRODUCT = "INSERT INTO articulos (descripcion, precio, stock, usuario) VALUES (?,?,?,?)";
exports.SELECT_SEARCH_PRODUCT = "SELECT id, descripcion, precio, stock,usuario FROM articulos WHERE (id LIKE ?  descripcion LIKE ? ) LIMIT ? OFFSET ? "
exports.COUNT_PRODUCTS = "SELECT COUNT(*) AS Total FROM articulos"
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