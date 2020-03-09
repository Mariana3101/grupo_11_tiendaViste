  function authMiddleware(req, res, next) {
      //  if (req.session.userId == undefined) {
      //return res.redirect('ingresar');
      if (req.isAuthenticated()) {
          return next();
      }
      return res.redirect('ingresar');


  }




  module.exports = authMiddleware;