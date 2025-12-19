const express = require("express");
const { addReview, listReviews } = require("../controllers/reviewController");

const router = express.Router();

router.post("/review", addReview);
router.get("/review", listReviews);

module.exports = router;


