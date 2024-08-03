const Review = require("../models/ReviewModel");
const ExpressError = require("../utils/ExpressError");

module.exports.isReviewOwner = async (req, res, next) => {
  const { reviewId } = req.params;
  console.log(req.params);
  console.log(reviewId);
  const review = await Review.findById(reviewId);
  console.log(review);
  if (!review.owner._id.equals(req.user.user._id)) {
    next(new ExpressError(500, "you are not owner of the product"));
  }
  next();
};
