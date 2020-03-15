function userCookieMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if (req.cookies.userCookie || req.session.users) {
        req.session.users = req.cookies.userCookie ? req.cookies.userCookie : req.session.users;
        res.locals.isLogged = true;
    }

    next();
}

module.exports = userCookieMiddleware;