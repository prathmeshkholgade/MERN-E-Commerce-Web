const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../Middlewares/isLoggedIn");

router.post("/register", wrapAsync(userController.registerUser));
router.post("/login", wrapAsync(userController.loginUser));
router.post("/logout", wrapAsync(userController.logOut));
router.get("/", isLoggedIn, wrapAsync(userController.getUser));

module.exports = router;
