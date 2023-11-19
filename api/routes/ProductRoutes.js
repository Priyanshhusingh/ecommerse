const express = require("express");
const multer = require("multer");
const {
  uploadImageByUrl,
  uploadImageByFile,
  createProduct,
  AllProduct,
  singleProduct,
  ProductPagination,
  UpdateProduct,
  deleteProduct,
  SearchProduct,
  TotalUser,
} = require("../Controller/ProductController");

const photosMiddleware = multer({ dest: "uploads" });

const ProductRouter = express.Router();

ProductRouter.post("/upload-by-link", uploadImageByUrl);

// Use a different function for handling file uploads
ProductRouter.post(
  "/upload",
  photosMiddleware.array("productImage", 100),
  uploadImageByFile
);

ProductRouter.post("/products", createProduct);
ProductRouter.get("/all-products", AllProduct);
ProductRouter.get("/product/:id", singleProduct);
ProductRouter.patch("/product/:id", UpdateProduct);
ProductRouter.delete("/product/:id", deleteProduct);
ProductRouter.get("/products-per-page", ProductPagination);
ProductRouter.get("/search", SearchProduct);
ProductRouter.get("/all-user-product", TotalUser);
module.exports = ProductRouter;
