const express = require("express");
const moviesController = require("../controllers/moviesController");
const router = express.Router();

//INDEX
router.get("/", moviesController.index);

//SHOW
router.get("/:slug", moviesController.show);

//Movie reviews
router.post("/:id/reviews", moviesController.storeReview);

module.exports = router;
