const express = require("express");
const Address = require("../models/addressSchema");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const User = require("../models/userModel");
const router = express.Router();

router.post("/", isLoggedIn, async (req, res) => {
  const addressData = new Address(req.body);
  addressData.user = req.user?.user._id;
  const result = await addressData.save();
  const user = await User.findById(req.user?.user._id);
  user.address.push(result._id);
  await user.save();
  console.log(user);
  res.send(result);
});

module.exports = router;
