function authMiddleware(req, res, next) {
    if (req.session.userId == undefined) {
        return res.redirect('/usuarios/ingresar');
    }
    next();
}

module.exports = authMiddleware;