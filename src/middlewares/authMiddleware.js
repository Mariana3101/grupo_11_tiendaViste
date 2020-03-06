/*  function authMiddleware(req, res, next) {
      if (req.session.userId == undefined) {
          return res.redirect('ingresar');
      }
      next();
  }

module.exports = authMiddleware;

//const { User, AuthToken } = require('../models');
const db = require('../database/models');

function authMiddleware(req, res, next) {


    const token =
        req.cookies.auth_token || req.headers.authorization;


    if (token) {


        const authMiddleware = AuthToken.find({
            where: { token },
            include: db.User
        });


        if (authMiddleware) {
            req.user = authMiddleware.User;
        }
    }
    next();
}

module.exports = authMiddleware;*/
module.exports = (sequelize, DataTypes) => {

    const authMiddleware = sequelize.define('authMiddleware', {
        token: DataTypes.STRING
    }, {});


    authMiddleware.associate = function({ User }) {
        authMiddleware.belongsTo(User);
    };
    return authMiddleware;
};