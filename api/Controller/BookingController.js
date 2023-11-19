const jwt = require("jsonwebtoken");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const Address = require("../models/Addressmodel");
const Booking = require("../models/BookingModel");
const jwtSecret = "thisisecommerseWebsiteforlearningpurpose";

exports.CreateBooking = async (req, res) => {
  try {
    const { productQuantity, ProductId } = req.body;
    console.log(productQuantity, ProductId);
    const { token } = req.cookies;
    const userData = jwt.verify(token, jwtSecret, {});
    consolr.log(userData)
    const userDoc = await User.findById(userData.id);

    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const userAddress = await Address.findOne({
      owner: userDoc._id,
      isDefault: true,
    });

    if (!userAddress) {
      return res.status(404).json({ error: "Address not found for the user" });
    }

    const BookingDoc = await Booking.create({
      user: userDoc._id,
      product: ProductId.map((product) => product.ProductId),
      productQuantity,
      address: userAddress._id,
    });

    if (!BookingDoc) {
      return res.status(400).json({ error: "Failed to create booking" });
    }

    return res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
