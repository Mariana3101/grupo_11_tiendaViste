function guestMiddleware(req, res, next) {
    if (req.session.userId != undefined) {
        return res.redirect('perfil');
    }
    next();
}

module.exports = guestMiddleware;