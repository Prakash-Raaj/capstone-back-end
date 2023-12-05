import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orders: [
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
          default: 1,
        },
        createdAt: {
          type: String,
          required: false,
        },
        createdAt: {
          type: String,
          required: false,
        },
        updatedAt: {
          type: String,
          required: false,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Order = mongoose.model('order', orderSchema);

export default Order;
