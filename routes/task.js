const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

// POST /list/create
router.get("/:id", TaskController.show);
router.post("/create", TaskController.create);
router.post("/done/:id", TaskController.done);
router.post("/redo/:id", TaskController.redo);
router.post("/delete/:id", TaskController.delete);
router.post("/edit/:id", TaskController.update);

module.exports = router;
