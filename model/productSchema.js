import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    MRP: {
      type: Number,
      required: true,
    },
    history: [
      {
        price: Number,
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        updatedDate: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

export default Product;
