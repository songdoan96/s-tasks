const List = require("../models/List");
const Task = require("../models/Task");

module.exports = {
  index: async (req, res, next) => {
    const lists = await List.find({ user_id: req.user._id }).populate("tasks").lean();

    res.render("pages/home", { title: "Trang chủ", lists });
  },
  list: (req, res, next) => {
    res.render("pages/list", { title: "Trang chủ" });
  },
};
