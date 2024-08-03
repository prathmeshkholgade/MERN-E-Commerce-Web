const Product = require("../models/productModel");
const Review = require("../models/ReviewModel");

module.exports.createReview = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const newReview = new Review(req.body);
  newReview.owner = req.user?.user._id;
  product.reviews.push(newReview);
  await product.save();
  const result = await newReview.save();
  res.status(200).json(result);
};

module.exports.deleteReview = async (req, res, next) => {
  const { productId, reviewId } = req.params;
  const review = await Review.findByIdAndDelete(reviewId);
  const product = await Product.findByIdAndUpdate(productId, {
    $pull: { reviews: reviewId },
  });
  if (!product) {
    return next(new ExpressError(500, "review not found"));
  }
  if (!review) {
    return next(new ExpressError(500, "review not found"));
  }
  res.send("review deleted");
};
