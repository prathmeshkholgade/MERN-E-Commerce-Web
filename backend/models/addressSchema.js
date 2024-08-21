const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    alternateNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("address", addressSchema);
module.exports = Address;
