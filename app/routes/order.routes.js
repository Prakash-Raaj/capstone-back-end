import express from 'express';
import {
  create,
  findAll,
  findAllPublished,
  findOne,
  update,
  deleteTutorial,
  deleteAll,
} from '../controllers/order.controller.js';

export const orderRouter = express.Router();

// Create a new order
orderRouter.post('/', create);

// Retrieve all orders
orderRouter.get('/', findAll);

// Retrieve a single order with id
orderRouter.get('/:id', findOne);

// Delete a order with id
orderRouter.delete('/:id', deleteTutorial);
