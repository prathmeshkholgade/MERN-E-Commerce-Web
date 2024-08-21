const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true },
    image: [{ url: String, fileName: String }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.name = this.name.trim();
  this.description = this.description.trim();
  this.category = this.category.trim();
  (this.price = Number(this.price)),
    (this.sellingPrice = Number(this.sellingPrice)); // Ensure price is a number
  next();
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
