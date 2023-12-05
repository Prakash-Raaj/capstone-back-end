import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      defaultValue: 1,
    },
  },

  { timestamps: true }
);

cartSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
