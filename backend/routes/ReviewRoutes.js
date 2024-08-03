const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();
const Review = require("../models/ReviewModel");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const { validateReview } = require("../Middlewares/schemaValidater");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { isReviewOwner } = require("../Middlewares/middlerware");
const reviewController = require("../controllers/reviewController");

router.post(
  "/:id",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

router.delete(
  "/:productId/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.deleteReview)
);
module.exports = router;
