import db from "../models/index.js";

const Wishlist = db.wishlist;

export const createWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const newWishlistItem = new Wishlist({
      userId: userId,
      productId: productId,
    });

    const savedWishlistItem = await newWishlistItem.save();

    res.status(201).send(savedWishlistItem);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating a wishlist item.",
    });
  }
};

export const getWishlistItemsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;

    const wishlistItems = await Wishlist.find({ userId: userId });

    res.send(wishlistItems);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving wishlist items.",
    });
  }
};

export const deleteWishlistItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedWishlistItem = await Wishlist.findByIdAndDelete(itemId);

    if (!deletedWishlistItem) {
      return res.status(404).send({
        message: "Wishlist item not found for deletion.",
      });
    }
    res.send({ message: "Wishlist item deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting a wishlist item.",
    });
  }
};
