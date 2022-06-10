const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const passport = require("passport");
// GET /login | render login page
router.get("/login", UserController.loginView);
// POST /login | handle login
router.post(
  "/login",
  UserController.checkFormLogin,
  passport.authenticate("local", {
    successRedirect: "/user/login-success",
    failureRedirect: "/user/login-fail",
  })
);

// GET /register | render login page
router.get("/register", UserController.registerView);
// POST /register | create user
router.post("/register", UserController.createUser);

// POST /user/logout | Logout
router.post("/logout", UserController.logout);

// Login redirect
router.get("/login-fail", (req, res) => {
  req.flash("toast-type", "danger");
  req.flash("toast-content", "Tài khoản hoặc mật khẩu chưa đúng.");
  res.redirect("/");
});
router.get("/login-success", (req, res) => {
  req.flash("toast-type", "success");
  req.flash("toast-content", "Đăng nhập thành công.");
  res.redirect("/");
});

module.exports = router;
