import db from '../models/index.js';

const Order = db.order;

// Create and Save a new Tutorial
export const create = async (req, res) => {
  try {
    // Validate request
    // if (!req.body.title) {
    //   res.status(400).send({ message: 'Content can not be empty!' });
    //   return;
    // }

    const { userId, orders, promoCode, deliveryType, totalAmount } =
      req.body;

    // Create a order
    const order = new Order({
      userId: userId,
      orders: orders,
      promoCode: promoCode,
      deliveryType: deliveryType,
      totalAmount: totalAmount,
    });

    // Save order in the database
    const data = await order.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while creating the Tutorial.',
    });
  }
};

// Retrieve all orders from the database.
export const findAll = async (req, res) => {
  try {
    // console.log('TESTING', db.order);
    const userId = req.query.userId;
    const orders = await Order.find({ userId: userId });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while retrieving tutorials.',
    });
  }
};

// Find a single Tutorial with an id
export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findById(id);
    if (!data)
      res
        .status(404)
        .send({ message: 'Not found Tutorial with id ' + id });
    else res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ message: 'Error retrieving Tutorial with id=' + id });
  }
};

// Update a Tutorial by the id in the request
export const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    } else
      res.send({ message: 'Tutorial was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: 'Error updating Tutorial with id=' + id,
    });
  }
};

// Delete a Tutorial with the specified id in the request
export const deleteTutorial = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    } else {
      res.send({
        message: 'Tutorial was deleted successfully!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Could not delete Tutorial with id=' + id,
    });
  }
};

// Delete all Tutorials from the database.
export const deleteAll = async (req, res) => {
  try {
    const data = await Tutorial.deleteMany({});
    res.send({
      message: `${data.deletedCount} Tutorials were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while removing all tutorials.',
    });
  }
};

// Find all published Tutorials
export const findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.find({ published: true });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        'Some error occurred while retrieving tutorials.',
    });
  }
};
