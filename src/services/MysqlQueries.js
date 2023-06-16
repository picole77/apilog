exports.SELECT_USER = "SELECT nombre, password FROM usuarios WHERE username = ?";
exports.CREATE_USER = "INSERT INTO usuarios (nombre, username, password, correo) VALUES (?,?,?,?) ";
exports.SELECT_PRODUCT = "SELECT id, descripcion, precio, stock, creacion, usuario FROM articulos LIMIT ? OFFSET ?";
exports.UPDATE_PRODUCT = "UPDATE articulos SET descripcion = ?, precio = ?, stock= ?, usuario=?";
exports.DELETE_PRODUCT = "DELETE FROM articulos  WHERE id = ?";
exports.CREATE_PRODUCT = "INSERT INTO articulos (descripcion, precio, stock, usuario) VALUES (?,?,?,?)";
exports.SELECT_SEARCH_PRODUCT = "SELECT id, descripcion, precio, stock,usuario FROM articulos WHERE (id LIKE ?  descripcion LIKE ? ) LIMIT ? OFFSET ? "
exports.COUNT_PRODUCTS = "SELECT COUNT(*) AS Total FROM articulos"