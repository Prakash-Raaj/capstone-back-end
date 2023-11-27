import express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteReview,
  deleteAll,
} from "../controllers/review.controller.js";

export const reviewRouter = express.Router();

// Create a new Review
reviewRouter.post("/", create);

// Retrieve all Review
reviewRouter.get("/", findAll);

// Retrieve a single Review with id
reviewRouter.get("/:id", findOne);

// Update a Review with id
reviewRouter.put("/:id", update);

// Delete a Review with id
reviewRouter.delete("/:id", deleteReview);

// Create a new Review
reviewRouter.delete("/", deleteAll);
