const List = require("../models/List");
const Task = require("../models/Task");

module.exports = {
  show: async (req, res, next) => {
    try {
      const list = await List.findById(req.params.id).lean();
      const tasks = await Task.find({ list_id: list._id }).lean();
      const tasksInComplete = tasks.filter((task) => task.status === 0);
      const tasksComplete = tasks.filter((task) => task.status === 1);
      res.render("pages/list-detail", { list, tasksInComplete, tasksComplete });
    } catch (error) {
      res.status(404);
      next();
    }
  },
  create: async (req, res, next) => {
    const { flag, name } = req.body;
    const newList = new List({
      user_id: req.user._id,
      name,
      flag: Number(flag),
    });
    await newList.save();
    req.flash("toast-type", "success");
    req.flash("toast-content", "Tạo danh sách thành công.");
    res.redirect("/");
  },

  delete: async (req, res, next) => {
    try {
      await List.deleteOne({ _id: req.params.id });
      req.flash("toast-type", "success");
      req.flash("toast-content", "Xóa thành công.");
      res.redirect("/");
    } catch (error) {
      req.flash("toast-type", "danger");
      req.flash("toast-content", "Xóa không thành công.");
      res.redirect("/");
    }
  },
  update: async (req, res, next) => {
    const { flag, name } = req.body;

    try {
      await List.updateOne({ _id: req.params.id }, { name, flag: Number(flag) });
      req.flash("toast-type", "success");
      req.flash("toast-content", "Cập nhật thành công.");
      res.redirect("back");
    } catch (error) {
      req.flash("toast-type", "danger");
      req.flash("toast-content", "Cập nhật không thành công.");
      res.redirect("back");
    }
  },
};
