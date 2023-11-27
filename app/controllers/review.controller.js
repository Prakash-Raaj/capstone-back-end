import db from "../models/index.js";

const Review = db.review;

// Create and Save a new Review
export const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.review) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Review
    const reveiw = new Review({
      productId: req.body.productId,
      review: req.body.review,
      stars: req.body.stars,
      userName: req.body.userName,
    });

    // Save Review in the database
    const data = await reveiw.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Review.",
    });
  }
};

// Retrieve all Reviews for the product.
export const findAll = async (req, res) => {
  const productId = req.query.productId;
  const condition = { productId: productId };
  try {
    const data = await Review.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving reviews.",
    });
  }
};

// Find a single Review with an id
export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Review.findById(id);
    if (!data)
      res.status(404).send({ message: "Not found Review with id " + id });
    else res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Review with id=" + id });
  }
};

// Update a Review by the id in the request
export const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  try {
    const data = await Review.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Review with id=${id}. Maybe Review was not found!`,
      });
    } else res.send({ message: "Review was updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Review with id=" + id,
    });
  }
};

// Delete a Review with the specified id in the request
export const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Review.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Review with id=${id}. Maybe Review was not found!`,
      });
    } else {
      res.send({
        message: "Review was deleted successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Review with id=" + id,
    });
  }
};

// Delete all Reviews for a product.
export const deleteAll = async (req, res) => {
  try {
    const productId = req.query.productId;

    if (!productId) {
      return res.status(400).send({
        message:
          "productId parameter is required for deleting reviews for a product.",
      });
    }

    const condition = { productId: productId };

    const data = await Review.deleteMany(condition);

    res.send({
      message: `${data.deletedCount} reviews for product ${productId} were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while removing reviews for the product.",
    });
  }
};
