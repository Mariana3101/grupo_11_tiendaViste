/*
function authMiddleware(req, res, next) {
    if (req.session.users == undefined) {
        return res.redirect('/usuarios/ingresar');
    }
    next();
}
*/

// Authentication and Authorization Middleware



var authMiddleware = function(req, res, next) {
    //console.log(req.session.user);
    if (req.session && req.session.user)
        return next();
    else
        return res.redirect('/');
}

   

module.exports = authMiddleware;