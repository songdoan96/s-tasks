const Task = require("../models/Task");
const List = require("../models/List");
module.exports = {
  show: async (req, res, next) => {
    const task = await Task.findById(req.params.id).lean();
    res.render("pages/task-edit", { task });
  },
  create: async (req, res, next) => {
    try {
      const task = await Task.create(req.body);
      const list_id = req.body.list_id;
      await List.updateOne({ _id: list_id }, { $push: { tasks: task } });
      req.flash("toast-type", "success");
      req.flash("toast-content", "Thêm thành công.");
      res.redirect("back");
    } catch (error) {
      req.flash("toast-type", "danger");
      req.flash("toast-content", "Thêm không thành công.");
      res.redirect(`/list/${req.body.list_id}`);
    }
  },

  delete: async (req, res, next) => {
    try {
      await Task.deleteOne({ _id: req.params.id });
      req.flash("toast-type", "success");
      req.flash("toast-content", "Xóa thành công.");
      res.redirect("back");
    } catch (error) {
      req.flash("toast-type", "danger");
      req.flash("toast-content", "Xóa không thành công.");
      res.redirect("back");
    }
  },
  update: async (req, res, next) => {
    try {
      const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body).lean();
      req.flash("toast-type", "success");
      req.flash("toast-content", "Cập nhật thành công.");
      res.redirect(`/list/${task.list_id}`);
    } catch (error) {
      req.flash("toast-type", "danger");
      req.flash("toast-content", "Cập nhật không thành công.");
      res.redirect("back");
    }
  },
  done: async (req, res, next) => {
    try {
      await Task.updateOne({ _id: req.params.id }, { status: 1 });
      req.flash("toast-type", "success");
      req.flash("toast-content", "Cập nhật thành công.");
      res.redirect(`back`);
    } catch (error) {
      req.flash("toast-type", "danger");
      req.flash("toast-content", "Cập nhật không thành công.");
      res.redirect("back");
    }
  },
  redo: async (req, res, next) => {
    try {
      await Task.findOneAndUpdate({ _id: req.params.id }, { status: 0 });
      req.flash("toast-type", "success");
      req.flash("toast-content", "Cập nhật thành công.");
      res.redirect(`back`);
    } catch (error) {
      req.flash("toast-type", "danger");
      req.flash("toast-content", "Cập nhật không thành công.");
      res.redirect("back");
    }
  },
};
