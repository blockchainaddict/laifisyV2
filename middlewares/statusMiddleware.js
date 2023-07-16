// Middleware for role checking
function statusMiddleware(status) {
    return (req, res, next) => {
      if (req.user.status !== status) {
        return res.status(403).json({ message: `Requires ${status} status` });
      }
  
      next();
    };
  };

module.exports = statusMiddleware;