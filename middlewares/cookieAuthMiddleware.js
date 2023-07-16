const { User } = require('../database/models');

function cookieAuthMiddleware(req, res, next) {
  if (req.cookies.rememberAccount !== undefined && req.session.userToLog === undefined) {
    User.findOne({ where: { username: req.cookies.rememberAccount } })
      .then(user => {
        if (user) {
          req.session.userToLog = user;
        }
        next();
      })
      .catch(err => {
        console.error(err);
        next(err);
      });
  } else {
    next();
  }
}

module.exports = cookieAuthMiddleware;