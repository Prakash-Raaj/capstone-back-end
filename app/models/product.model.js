import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // You can use a data type like String to store image URLs
      },
    ],
    variants: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL"],
          required: true, // if size is required
        },
        color: String,
        quantity: {
          type: Number,
          required: true, // if quantity is required
        },
        price: {
          type: Number,
          required: true,
        },
        discountPercentage: Number,
      },
    ],
    // can add any details about the product in key value pairs
    productDetails: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    // Added to have a calculation for delievery price.x
    shipping: {
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      shippingClass: String,
    },

    tags: [String], // Store product tags/keywords in an array
  },
  { timestamps: true }
);

productSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Product = mongoose.model("product", productSchema);

export default Product;
