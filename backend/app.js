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
    const { amount, products, address, userId, quantity, price } = req.body;
    const product = products.map((item) => ({
      products: item.productId,
      quantity: item.quantity,
      sellingPrice: item.sellingPrice,
    }));

    console.log("this is map product", product);
    console.log(req.body);
    const newOrder = new Order({
      user: userId,
      product: product,
      shippingAddress: address,
      totalPrice: amount,
      quantity: quantity,
    });
    console.log(newOrder);
    console.log("this is product data", products);
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    newOrder.paymentInfo.orderId = order.id;
    await newOrder.save();
    res.status(200).json({ success: true, order });
  })
);

app.post(
  "/payment/verify",
  wrapAsync(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    const isAuthebticate = expectedSignature === razorpay_signature;
    if (isAuthebticate) {
      const order = await Order.findOne({
        "paymentInfo.orderId": razorpay_order_id,
      });
      order.isPaid = true;
      order.paymentInfo.signature = razorpay_signature;
      order.paymentInfo.paymentId = razorpay_payment_id;
      await order.save();
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        reference: razorpay_payment_id,
      });
      // res.redirect(
      //   `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
      // );
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

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.listen(8080, () => {
  console.log("server is listing to port 8080");
});
