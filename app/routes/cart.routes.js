import express from "express";
import {
  createCartItem,
  getCartItemsByUserId,
  deleteCartItemById,
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";

export const cartRouter = express.Router();

// Create a new cart item
cartRouter.post("/", createCartItem);

// Retrieve all cart items by user id
cartRouter.get("/", getCartItemsByUserId);

// Update the cart quantity
cartRouter.put("/:id", updateCartItemQuantity);

// Delete a cart with id
cartRouter.delete("/:id", deleteCartItemById);
