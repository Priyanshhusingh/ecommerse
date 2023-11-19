const express = require("express");
const mongoose = require("mongoose");
const {
  createUser,
  Userlogin,
  Userprofile,
  UserLogout,
  UserWhishList,
  UserDeleteWhishList,
  AddToCart,
  DeleteFromCart,
} = require("../Controller/UserController");

const UserRouter = express.Router();

UserRouter.post("/userRegister", createUser);
UserRouter.post("/userLogin", Userlogin);
UserRouter.get("/userProfile", Userprofile);
UserRouter.post("/logout", UserLogout);
UserRouter.post("/user-whishlist-products", UserWhishList);
UserRouter.delete("/user-whishlist-products", UserDeleteWhishList);
UserRouter.post("/add-To-cart/:id", AddToCart);
UserRouter.delete("/add-To-cart/:id", DeleteFromCart);


module.exports = UserRouter;
