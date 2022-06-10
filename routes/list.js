const express = require("express");
const router = express.Router();
const ListController = require("../controllers/ListController");

// POST /list/create
router.get("/:id", ListController.show);
router.post("/create", ListController.create);
router.post("/delete/:id", ListController.delete);
router.post("/edit/:id", ListController.update);

module.exports = router;
