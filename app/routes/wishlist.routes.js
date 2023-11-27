import express from "express";
import {
  createWishlistItem,
  getWishlistItemsByUserId,
  deleteWishlistItemById,
} from "../controllers/wishlist.controller.js";

export const wishlistRouter = express.Router();

// Create a new wishlist item
wishlistRouter.post("/", createWishlistItem);

// Retrieve all Wishlist items by user id
wishlistRouter.get("/", getWishlistItemsByUserId);

// Delete a Wishlist with id
wishlistRouter.delete("/:id", deleteWishlistItemById);
