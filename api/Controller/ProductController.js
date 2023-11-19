const imageDownloader = require("image-downloader");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const jwtSecret = "thisisecommerseWebsiteforlearningpurpose";

// Upload image by URL
exports.uploadImageByUrl = async (req, res) => {
  const { link } = req.body;
  const newName = `photo${Date.now()}.jpg`;

  try {
    const destPath = path.join(__dirname, "..", "uploads", newName);

    await imageDownloader.image({
      url: link,
      dest: destPath,
    });

    res.json(newName);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Upload image by file
exports.uploadImageByFile = (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", "")); // Replace "uploads/" with an empty string
  }
  res.json(uploadedFiles);
};

// create Product
exports.createProduct = async (req, res) => {
  const { title, description, price, productImage, productQuantity } = req.body;
  const { token } = req.cookies;

  try {
    const userData = jwt.verify(token, jwtSecret);
    const { id } = userData;
    const user = await User.findById(id);

    if (user.admin) {
      const productDoc = await Product.create({
        title,
        description,
        price,
        imageUrl: productImage,
        productQuantity,
      });
      res
        .status(201)
        .json({ success: true, message: "Product created successfully" });
    } else {
      console.log("not Admin");
      res.status(403).json({ error: "Forbidden - User is not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

exports.AllProduct = async (req, res) => {
  try {
    const ProductDoc = await Product.find();
    res.json(ProductDoc);
  } catch (error) {
    res.json("Internal server Error");
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDoc = await Product.findById(id);
    res.json(productDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server Error");
  }
};

exports.ProductPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    if (page < 1) {
      return res.status(400).json({ error: "Invalid page number" });
    }
    const productsPerPage = 3;
    const skip = (page - 1) * productsPerPage;
    const [products, totalCount] = await Promise.all([
      Product.find().skip(skip).limit(productsPerPage),
      Product.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalCount / productsPerPage);

    res.json({
      products,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, productImage, productQuantity } = req.body;
  const { token } = req.cookies;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const userData = jwt.verify(token, jwtSecret);
    const user = await User.findById(userData.id);

    if (!user || !user.admin) {
      return res
        .status(403)
        .json({ error: "Forbidden - User is not an admin" });
    }

    const productDoc = await Product.findById(id);
    if (!productDoc) {
      return res.status(404).json({ error: "Product not found" });
    }

    productDoc.set({
      title,
      description,
      price,
      imageUrl: productImage,
      productQuantity,
    });

    await productDoc.save();

    res
      .status(201)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const userData = jwt.verify(token, jwtSecret);
    const user = await User.findById(userData.id);

    if (!user || !user.admin) {
      return res
        .status(403)
        .json({ error: "Forbidden - User is not an admin" });
    }

    const productDoc = await Product.findByIdAndDelete(id);

    if (!productDoc) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
exports.SearchProduct = async (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const searchResults = await Product.find({
      title: { $regex: query, $options: "i" }, //
    });

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.TotalUser = async (req, res) => {
  try {
    const allUserCount = await User.countDocuments();
    const allProductCount = await Product.countDocuments();
    res.json({ totalUsers: allUserCount, totalProducts: allProductCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
