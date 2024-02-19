import mongoose from "mongoose";

const productCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
