  function authMiddleware(req, res, next) {
      if (req.session.userId == undefined) {
          return res.redirect('ingresar');
      }
      next();
  }

  module.exports = authMiddleware;