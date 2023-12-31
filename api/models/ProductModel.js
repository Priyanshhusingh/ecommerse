// product.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: Array },
  productQuantity: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
