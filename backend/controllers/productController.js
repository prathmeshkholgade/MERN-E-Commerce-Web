const { populate } = require("dotenv");
const Product = require("../models/productModel");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products: products });
};

module.exports.sigleProduct = async (req, res) => {
  console.log(req.params);
  const product = await Product.findById(req.params.id).populate({
    path: "reviews",
    populate: { path: "owner", select: "fullName" },
  });

  res.status(200).json({ product: product });
};

module.exports.updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  await updatedProduct.save();
  res.status(200).json(updatedProduct);
};

module.exports.deleteProduct = async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return next(new ExpressError(400, "Product Not Found"));
  }
  res.status(200).json({ message: "Product Deleted Successfully" });
};

module.exports.createProduct = async (req, res) => {
  const data = req.body;
  const files = req.files;
  const images = files.map((file) => ({
    url: file.path,
    fileName: file.filename,
  }));
  const newProduct = new Product(data);
  newProduct.image = images;
  console.log(newProduct);
  await newProduct.save();
  res.status(200).json(newProduct);
};


module.exports.similarProduct = async (req, res) => {
  const { category, id } = req.params;
  console.log(req.params);
  let similar = await Product.find({ category: category });
  similar = similar.filter((product) => {
    return product.id !== id;
  });
  res.status(200).json(similar);
};



