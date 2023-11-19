const jwt = require("jsonwebtoken");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const Address = require("../models/Addressmodel");
const jwtSecret = "thisisecommerseWebsiteforlearningpurpose";

exports.CreateAddress = async (req, res) => {
  try {
    const { name, street, number, country, region, isDefault } = req.body;
    const { token } = req.cookies;

    // Verify and extract user data from the token
    const userData = jwt.verify(token, jwtSecret);
    const userDoc = await User.findById(userData.id);

    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create an address associated with the user
    const addressDoc = await Address.create({
      owner: userDoc._id,
      name,
      street,
      number,
      country,
      region,
      isDefault,
    });

    if (!addressDoc) {
      return res.status(400).json({ error: "Failed to create address" });
    }

    return res.status(201).json({ message: "Address created successfully" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
