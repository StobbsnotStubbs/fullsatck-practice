const LoggerMiddleware = (req, res, next) => {
    console.log(`${req.method} Logged @ -- ${new Date()}`);
    next();
  };

  module.exports = LoggerMiddleware;