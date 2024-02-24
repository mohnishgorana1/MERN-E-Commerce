import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    gender: {
      type: String,
      enum: ["MEN", "WOMEN"],
      required: true,
    },
    images: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    brand: { type: String },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    stockQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
