const express = require('express');
const router = express.Router();
const review_controller = require("../controllers/reviewController");
const contact_controller = require("../controllers/contactController");
const validate = require("../validation/auth");

router.get("/logout", validate.logout);
router.post("/review/add", validate.checkValidation, validate.postReview, review_controller.review_add_post);
router.get("/reviews", review_controller.reviews_get);
router.post("/validate/google", validate.google);
router.post("/contact", validate.checkValidation, contact_controller.contact_add_entry);


module.exports = router;
