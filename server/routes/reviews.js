const express = require('express');
const router = express.Router();
const review_controller = require("../controllers/reviewController")
const validate = require("../validation/auth")
//get all reviews

router.post("/review/add", validate.postReview,review_controller.review_add_post);
router.get("/reviews", review_controller.reviews_get);

module.exports = router;