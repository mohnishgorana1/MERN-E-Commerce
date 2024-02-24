import mongoose, { Schema } from "mongoose";

const productCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
