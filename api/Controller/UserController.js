const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "thisisecommerseWebsiteforlearningpurpose";

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const userDoc = new User({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    await userDoc.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);

      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              console.error("Error creating JWT:", err);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              res.cookie("token", token).json(userDoc);
            }
          }
        );
      } else {
        res.status(401).send("Unauthorized");
      }
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Userprofile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret, {});
      const { name, email, admin, _id, wishist, cart } = await User.findById(
        userData.id
      );
      res.json({ name, email, admin, _id, wishist, cart });
    } catch (err) {
      console.error("Error verifying token:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.json(null);
  }
};

exports.UserLogout = (req, res) => {
  res.clearCookie("token").json(true);
};

exports.UserWhishList = async (req, res) => {
  const { productId } = req.body;
  const { token } = req.cookies;

  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret, {});
      await User.updateOne(
        { _id: userData.id },
        { $addToSet: { wishist: productId } }
      );

      res.json({ success: true });
    } catch (err) {
      console.error("Error verifying token:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.UserDeleteWhishList = async (req, res) => {
  const { productId } = req.body;
  const { token } = req.cookies;

  if (token) {
    try {
      const userData = jwt.verify(token, jwtSecret, {});
      await User.updateOne(
        { _id: userData.id },
        { $pull: { wishist: productId } }
      );

      res.json({ success: true });
    } catch (err) {
      console.error("Error verifying token:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.AddToCart = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  const { token } = req.cookies;
  try {
    const UserData = jwt.verify(token, jwtSecret, {});
    const user = await User.findById(UserData.id);
    user.cart.push({ productId: id, price: price });
    await user.save();
    res.json("added Succesfully");
  } catch (error) {
    res.json(error);
  }
};
exports.DeleteFromCart = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  try {
    const userData = jwt.verify(token, jwtSecret);
    const user = await User.findByIdAndUpdate(
      userData.id,
      { $pull: { cart: { productId: id } } },
      { new: true }
    );

    res.json("Removed Successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
