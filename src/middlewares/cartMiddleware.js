module.exports = (req, res, next) => {
	// Si no existe session.cart, lo inicializamos vacío
	if (!req.session.carrito) {
		req.session.carrito = [];
	}
	// Setear en locals la cantidad de productos
	res.locals.cartQty = req.session.carrito.length;
	next();
}