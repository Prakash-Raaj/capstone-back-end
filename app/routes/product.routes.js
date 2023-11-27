import express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  deleteTutorial,
  deleteAll,
} from "../controllers/product.controller.js";

export const productRouter = express.Router();

// Create a new Tutorial
productRouter.post("/", create);

// Retrieve all Tutorials
productRouter.get("/", findAll);

// Retrieve a single Tutorial with id
productRouter.get("/:id", findOne);

// Update a Tutorial with id
productRouter.put("/:id", update);

// Delete a Tutorial with id
productRouter.delete("/:id", deleteTutorial);

// Create a new Tutorial
productRouter.delete("/", deleteAll);
