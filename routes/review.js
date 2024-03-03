const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAysnc = require("../utils/wrapAysnc.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const { validateReview } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Reviews post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAysnc(reviewController.reviewPost)
);

//Delete review route
router.delete("/:reviewId", wrapAysnc(reviewController.destroyReviews));

module.exports = router;
