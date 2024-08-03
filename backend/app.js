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
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParse());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/review", reviewRoutes);

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
