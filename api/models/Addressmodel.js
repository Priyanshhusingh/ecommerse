// address.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  street: { type: String, required: true },
  number: { type: Number, required: true },
  region: { type: String },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
