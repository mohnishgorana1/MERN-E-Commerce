import mongoose from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    images: [{ type: String }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    brand: { type: String },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    stock: {
      quantity: { type: Number, default: 0 },
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
