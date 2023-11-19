require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/UserModel");
const UserRouter = require("./routes/UserRoutes");
const ProductRouter = require("./routes/ProductRoutes");
const AddressRouter = require("./routes/AddressRoutes");
const BookingRouter = require("./routes/bookingRoutes");
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo Database is Connected");
  })
  .catch((err) => {
    console.log(`Database Error: ${err}`);
  });

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads/"));
app.use("/", UserRouter);
app.use("/", ProductRouter);
app.use("/", AddressRouter);
app.use("/", BookingRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening at localhost:${process.env.PORT || 3000}`);
});
