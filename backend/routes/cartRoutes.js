const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");

router.post("/:id", isLoggedIn, wrapAsync(cartController.addToCart));
router.delete("/:id", isLoggedIn, wrapAsync(cartController.removeCart));
router.put("/:id", isLoggedIn, wrapAsync(cartController.updateCart));
module.exports = router;
