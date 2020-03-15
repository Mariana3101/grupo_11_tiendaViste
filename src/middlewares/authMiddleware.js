function authMiddleware(req, res, next) {
    if (req.session.users == undefined) {
        return res.redirect('/usuarios/ingresar');
    }
    next();
}

module.exports = authMiddleware;