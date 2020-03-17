function guestMiddleware(req, res, next) {
    if (req.session.users != undefined) {
        return res.redirect('/usuarios/perfil');
    }
    next();
}



module.exports = guestMiddleware;