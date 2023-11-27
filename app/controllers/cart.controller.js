import db from "../models/index.js";

const Cart = db.cart;

export const createCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const newCartItem = new Cart({
      userId: userId,
      productId: productId,
    });

    const savedCartItem = await newCartItem.save();

    res.status(201).send(savedCartItem);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating a cart item.",
    });
  }
};

export const getCartItemsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;

    const cartItems = await Cart.find({ userId: userId });

    res.send(cartItems);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving cart items.",
    });
  }
};

export const deleteCartItemById = async (req, res) => {
  try {
    const itemId = req.params.id;

    const deletedCartItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedCartItem) {
      return res.status(404).send({
        message: "Cart item not found for deletion.",
      });
    }

    res.send({ message: "Cart item deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting a cart item.",
    });
  }
};
