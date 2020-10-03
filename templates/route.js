var express = require("express");
var router = express.Router();
var modelController = require("../controllers/mycontroller.js");

/* List All */
router.get("/", modelController.list);

/* Show Detail */
router.get("/:id", modelController.detail);

/* Create */
router.post("/", modelController.create);

/* Update */
router.put("/:id", modelController.update);

/* Delete */
router.delete("/:id", modelController.delete);

module.exports = router;
