const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../utils/schema");

module.exports.validateReview = (req, res, next) => {
  console.log(req.body);
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(500, errMsg);
  } else {
    next();
  }
};
