const express = require("express");
const { CreateAddress } = require("../Controller/addressController");

const AddressRouter = express.Router();

AddressRouter.post("/address", CreateAddress);

module.exports = AddressRouter;
