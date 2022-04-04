exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

exports.respondWithName = (req, res) => {
  let paramsName = req.params.imageNumber;
  res.render("index", { img: paramsName });
};

exports.respondWithHome = (req, res) => {
  res.render("home");
};
