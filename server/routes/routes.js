const express = require('express');
const router = express.Router();
const review_controller = require("../controllers/reviewController")
const validate = require("../validation/auth")

router.post("/review/add", validate.checkValidation, validate.postReview, review_controller.review_add_post);
router.get("/reviews", review_controller.reviews_get);
router.post("/validate/google", validate.google);

module.exports = router;