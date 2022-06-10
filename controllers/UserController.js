const User = require("../models/User");
const passport = require("passport");
module.exports = {
  loginView: (req, res, next) => {
    if (!req.user) {
      res.render("pages/login", { title: "Đăng nhập", layout: "noheader" });
    }
    res.render("pages/login", { title: "Đăng nhập" });
  },
  registerView: (req, res, next) => {
    res.render("pages/register", { title: "Đăng ký", layout: "noheader" });
  },
  checkFormLogin: (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      req.flash("toast-type", "warning");
      req.flash("toast-content", "Vui lòng nhập đầy đủ thông tin.");
      return res.redirect("/");
      // return res.render("pages/home", {
      //   errors: [{ msg: "Vui lòng nhập đầy đủ thông tin" }],
      //   username: req.body.username,
      //   layout: "noheader",
      // });
    }
    next();
  },

  createUser: async (req, res, next) => {
    const { username, password, password2 } = req.body;

    let errors = [];

    if (!username || !password || !password2) {
      errors.push({ msg: "Vui lòng nhập đầy đủ thông tin" });
    }
    if (username && username.length < 3) {
      errors.push({ msg: "Tài khoản phải hơn 3 ký tự" });
    }
    if (password != password2) {
      errors.push({ msg: "Mật khẩu chưa khớp" });
    }

    if (password && password.length < 3) {
      errors.push({ msg: "Mật khẩu phải hơn 3 ký tự" });
    }
    if (errors.length > 0) {
      res.render("pages/register", {
        errors,
        username,
        layout: "noheader",
      });
    } else {
      try {
        const checkExist = await User.findOne({ username });
        if (checkExist) {
          errors.push({ msg: "Tài khoản đã tồn tại" });
          res.render("pages/register", { errors, username });
        } else {
          const newUser = await new User({
            username,
            password,
          });
          await newUser.save();
          req.flash("toast-type", "success");
          req.flash("toast-content", "Đăng ký thành công.");
          res.redirect("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  logout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
};
