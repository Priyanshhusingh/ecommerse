const express = require("express");
const { CreateBooking } = require("../Controller/BookingController");

const BookingRouter = express.Router();

BookingRouter.post("/booking-order", CreateBooking);

module.exports = BookingRouter;
