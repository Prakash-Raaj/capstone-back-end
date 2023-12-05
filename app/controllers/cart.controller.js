import db from "../models/index.js";

const Cart = db.cart;

export const createCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const newCartItem = new Cart({
      userId: userId,
      productId: productId,
      quantity: 1,
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

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const action = req.query.action;

    // Action validation
    if (action !== "increase" && action !== "decrease") {
      return res.status(400).send({
        message: "Invalid action. Use 'increase' or 'decrease'.",
      });
    }

    // get Cart Item
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).send({
        message: "Cart item not found.",
      });
    }

    // Update the quantity based on the action
    if (action === "increase") {
      cartItem.quantity += 1;
    } else if (action === "decrease") {
      // Ensure quantity doesn't go below 0
      if (cartItem.quantity > 0) {
        cartItem.quantity -= 1;
      } else {
        return res.status(400).send({
          message: "Quantity cannot be negative.",
        });
      }
    }
    const updatedCartItem = await cartItem.save();
    res.send(updatedCartItem);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Error occurred while updating cart item quantity.",
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
