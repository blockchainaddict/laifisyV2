function authMiddleware(req, res, next) {

  // Middleware to display info Only for logged users
  if (req.session.userToLog != undefined) {
    next();
    
  } else {
    let message = "Log in to see Content";
    res.status(401).json({ message });
  }
}

module.exports = authMiddleware;