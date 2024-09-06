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
const port = process.env.PORT || 8080;
// const { default: items } = require("razorpay/dist/types/items");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParse());
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/review", reviewRoutes);
app.use("/address", addressRoutes);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.post(
  "/payment/checkout",
  wrapAsync(async (req, res) => {
    const { amount, products, address, userId, quantity } = req.body;
    const product = products.map((item) => ({
      products: item.productId,
      quantity: item.quantity,
      sellingPrice: item.sellingPrice,
    }));
    console.log("this is product data", products);
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      orderId: order.id,
      orderDetails: {
        user: userId,
        product: product,
        shippingAddress: address,
        totalPrice: amount,
        quantity: quantity,
      },
    });
  })
);

app.post(
  "/payment/verify",
  wrapAsync(async (req, res) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderDetails,
    } = req.body;
    console.log("this is data");
    console.log(orderDetails);
    console.log(req.body);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    console.log(expectedSignature);
    const isAuthebticate = expectedSignature === razorpay_signature;
    if (isAuthebticate) {
      const newOrder = new Order({
        user: orderDetails.orderDetails.user,
        product: orderDetails.orderDetails.product,
        shippingAddress: orderDetails.orderDetails.shippingAddress,
        totalPrice: orderDetails.orderDetails.totalPrice,
        quantity: orderDetails.orderDetails.quantity,
        isPaid: true,
        paymentInfo: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        },
      });
      await newOrder.save();
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        reference: razorpay_payment_id,
      });
    } else {
      res.status(400).json({ success: false });
    }
  })
);

app.get(
  "/orders",
  wrapAsync(async (req, res) => {
    const orders = await Order.find()
      .populate("product.products")
      .populate("user")
      .populate("shippingAddress");
    res.status(200).json({ success: true, orders });
  })
);

app.get(
  "/orders/:userId",
  wrapAsync(async (req, res) => {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate("product.products")
      .populate("user")
      .populate("shippingAddress");
    console.log(orders);
    res.status(200).json({ success: true, orders });
  })
);
app.options("*", cors(corsOptions));

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log("server is listing to port 8080");
});
