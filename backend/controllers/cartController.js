const Product = require("../models/productModel");
const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");

module.exports.addToCart = async (req, res, next) => {
  const userId = req.user.user._id;
  const { id } = req.params;
  const { quantity } = req.body;
  const user = await User.findById(userId);
  const product = await Product.findById(id);
  if (!product) {
    return next(new ExpressError(400, "Product not found"));
  }
  const cartItem = user.cart.find((item) => item.product.toString() === id);
  if (cartItem) {
    cartItem.quantity = cartItem.quantity + 1;
    // cartItem.quantity = quantity ? quantity : cartItem.quantity + 1;
  } else {
    user.cart.push({ product: id, quantity });
  }
  await user.save();
  res.status(200).json(user);
};

module.exports.removeCart = async (req, res) => {
  const userID = req.user.user._id;
  const user = await User.findById(userID);
  user.cart = user.cart.filter(
    (item) => item.product.toString() != req.params.id
  );
  await user.save();
  res.status(200).json(user);
};
module.exports.updateCart = async (req, res) => {
  const userId = req.user.user._id;
  const { quantity } = req.body;
  const { id } = req.params;
  const user = await User.findById(userId);
  const cartItem = user.cart.find((item) => item.product.toString() === id);
  if (cartItem) {
    cartItem.quantity = quantity;
  }
  await user.save();
  res.status(200).json(user.cart);
};
