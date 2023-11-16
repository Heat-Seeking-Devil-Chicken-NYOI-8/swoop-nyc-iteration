const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.locals.centerCookie = res.cookie('center', req.body, { httpOnly: true });
  return next();
};

module.exports = cookieController;
