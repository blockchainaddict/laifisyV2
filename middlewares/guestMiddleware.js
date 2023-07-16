function guestMiddleware(req, res, next) {
    // Not Logged users
    if (req.session.userToLog == undefined) {
      next();
    } else {
        let message = "You're already logged in!";
        res.status(401).json({ message, userLogged: req.session.userToLog });
      }
  }

module.exports = guestMiddleware;