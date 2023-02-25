const validator = (req, res, next) => {
    let title = req.query.title;
    if (!title) {
      next("Name is Required");
    } else {
      next();
    }
  };
  
  module.exports = validator;
  