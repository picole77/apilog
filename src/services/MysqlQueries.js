exports.SELECT_USER = "SELECT user, password FROM users WHERE user = ?";
exports.CREATE_USER = "INSERT INTO users (name, user, password) VALUES (?,?,?) ";
exports.SELECT_PRODUCT = "SELECT product, name FROM inventario LIMIT ? OFFSET ?";
exports.UPDATE_PRODUCT = "UPDATE inventario SET name = ?, product = ?";
exports.DELETE_PRODUCT = "DELETE FROM inventario  WHERE id = ?";
exports.CREATE_PRODUCT = "INSERT INTO inventario (name, product, ...etc) VALUES (?,?,?)";
exports.SELECT_SEARCH_PRODUCT = "SELECT product, name FROM inventario WHERE (name LIKE ? OR product LIKE ?) LIMIT ? OFFSET ? "
exports.COUNT_PRODUCTS = "SELECT COUNT(*) AS Total FROM inventario"