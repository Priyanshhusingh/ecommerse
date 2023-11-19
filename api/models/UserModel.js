const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: [true, "Email is already use"],
      required: [true, "Email is required"],
      validate: {
        validator: (value) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        price: { type: Number },
      },
    ],
    address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    wishist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
