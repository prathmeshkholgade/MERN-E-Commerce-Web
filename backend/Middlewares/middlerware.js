const Review = require("../models/ReviewModel");
const ExpressError = require("../utils/ExpressError");

module.exports.isReviewOwner = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.owner._id.equals(req.user.user._id)) {
    next(new ExpressError(500, "you are not owner of the product"));
  }
  next();
};
