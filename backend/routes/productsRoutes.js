const express = require("express");
const Product = require("../models/productModel");
const wrapAsync = require("../utils/wrapAsync");
const multer = require("multer");
const { cloudinary, storage } = require("../config/cloudConfig");
const upload = multer({ storage });
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", wrapAsync(productController.index));

router.get(
  "/search",
  wrapAsync(async (req, res) => {
    const searchFiled = req.query.q;
    if (searchFiled === "") {
      res.send([]);
    } else {
      let product = await Product.find({
        $or: [
          { name: { $regex: searchFiled, $options: "i" } },
          { category: { $regex: searchFiled, $options: "i" } },
        ],
      });
      res.status(200).json(product);
    }
  })
);

router.get("/:id", wrapAsync(productController.sigleProduct));
router.put("/:id", wrapAsync(productController.updateProduct));
router.delete("/:id", wrapAsync(productController.deleteProduct));
router.post(
  "/add",
  upload.array("img", 12),
  wrapAsync(productController.createProduct)
);
router.get(
  "/similar/:id/:category",
  wrapAsync(productController.similarProduct)
);

module.exports = router;
