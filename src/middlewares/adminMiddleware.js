var adminMiddleware = function(req, res, next) {
       if (req.session && req.session.user.role === "admin"){
           console.log("what")
        return next();
    } else {
    if (req.session.user.role === "guest" )

        return res.send('No tiene credenciales para acceder');
    }
}
   

module.exports = adminMiddleware;