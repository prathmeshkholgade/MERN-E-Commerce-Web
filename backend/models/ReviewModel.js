const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    comment: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
