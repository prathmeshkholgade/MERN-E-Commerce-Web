const User = require("../models/userModel");
const ExpressError = require("../utils/ExpressError");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res, next) => {
  const { fullName, email, password, isAdmin } = req.body;
  console.log(req.body);
  const alreadyUser = await User.findOne({ email: email });
  if (alreadyUser) return next(new ExpressError(500, "email is already exist"));
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(new ExpressError(500, err));
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) return next(new ExpressError(500, err));
      try {
        const user = new User({ fullName, email, password: hash });
        const token = generateToken(user);
        res.cookie("token", token);
        await user.save();
        const { password, ...userInfo } = user.toObject();
        res.status(200).json({ user: userInfo });
      } catch (err) {
        next(err);
      }
    });
  });
};

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).populate("cart.product");
  if (!user) return next(new ExpressError(500, "email or password invalid"));
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      const token = generateToken(user);
      res.cookie("token", token);
      const { password, ...userInfo } = user.toObject();
      req.user = userInfo;
      res.status(200).json({ user: userInfo });
    } else {
      next(new ExpressError(500, "email or password invalid"));
    }
  });
};

module.exports.logOut = (req, res) => {
  res.cookie("token", "");
  req.user = "";
  res.send("logout");
};
module.exports.getUser = (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};
