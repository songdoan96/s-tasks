const userAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.flash("toast-type", "warning");
  req.flash("toast-content", "Vui lòng đăng nhập để tiếp tục.");
  return res.redirect("/");
};

module.exports = { userAuthenticated };
