import express from "express";
import {
  create,
  findAll,
  findAllPublished,
  findOne,
  update,
  deleteTutorial,
  deleteAll,
} from "../controllers/tutorial.controller.js";

export const tutorialRouter = express.Router();

// Create a new Tutorial
tutorialRouter.post("/", create);

// Retrieve all Tutorials
tutorialRouter.get("/", findAll);

// Retrieve all published Tutorials
tutorialRouter.get("/published", findAllPublished);

// Retrieve a single Tutorial with id
tutorialRouter.get("/:id", findOne);

// Update a Tutorial with id
tutorialRouter.put("/:id", update);

// Delete a Tutorial with id
tutorialRouter.delete("/:id", deleteTutorial);

// Create a new Tutorial
tutorialRouter.delete("/", deleteAll);
