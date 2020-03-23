
const db = require('../database/models');

const userCookieMiddleware = async (req, res, next) =>{
    res.locals.isLogged = false;

    if (req.session.user) {
        res.locals.isLogged = true;
        res.locals.user = req.session.user
    }

    else if (req.cookies.user_email != undefined){
        let user = await db.Users.findOne({
            where: { email: req.cookies.user_email }
        })

        if (user) {
            req.session.user = user;
            res.locals.isLogged = true;
            res.locals.user = req.session.user
        } else {
            res.redirect('ingresar');
        }
    }

    next();
}

module.exports = userCookieMiddleware;