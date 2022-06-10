const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
// GET /
router.get(
  "/",
  function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.render("pages/home", { title: "Trang chủ", layout: "noheader" });
    }
    next();
  },
  HomeController.index
);

module.exports = router;
