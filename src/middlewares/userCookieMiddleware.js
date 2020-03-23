function userCookieMiddleware(req, res, next) {
    res.locals.aute= false;

    if (req.session.user) {

        res.locals.isLogged = true;
        res.locals.user = req.session.user
    }

    next();
}

module.exports = userCookieMiddleware;