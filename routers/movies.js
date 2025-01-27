const express = require("express");
const moviesController = require("../controllers/moviesController");
const router = express.Router();

//INDEX
router.get("/", moviesController.index);

//SHOW
router.get("/:slug", moviesController.show);

module.exports = router;
