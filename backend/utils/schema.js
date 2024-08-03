const joi = require("joi");

module.exports.reviewSchema = joi.object({
  rating: joi.number().min(1).max(5).required(),
  comment: joi.string().required(),
});
