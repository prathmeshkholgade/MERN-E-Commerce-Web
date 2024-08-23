require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./config/dataBase");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");
const cookieParse = require("cookie-parser");
const cartRoutes = require("./routes/cartRoutes");
const addressRoutes = require("./routes/addressRoutes");
const cors = require("cors");
const Razorpay = require("razorpay");
const wrapAsync = require("./utils/wrapAsync");
const crypto = require("crypto");
const Order = require("./models/orderModel");
const Product = require("./models/productModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParse());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/review", reviewRoutes);
app.use("/address", addressRoutes);

const addSellingPrice = async () => {
  const allproducts = await Product.find({});
  for (let item of allproducts) {
    item.sellingPrice = 15499;
    await item.save();
  }

  console.log("add selling price");
};
addSellingPrice();
