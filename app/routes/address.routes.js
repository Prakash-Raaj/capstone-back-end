import express from "express";
import {
  createAddress,
  getAddressesByUserId,
  updateAddressById,
  deleteAddressById,
} from "../controllers/address.controller.js";

export const addressRouter = express.Router();

// Create a new address
addressRouter.post("/", createAddress);

// Retrieve all address by user id
addressRouter.get("/", getAddressesByUserId);

// Update a address with id
addressRouter.put("/:id", updateAddressById);

// Delete a address with id
addressRouter.delete("/:id", deleteAddressById);
