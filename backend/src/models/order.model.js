import mongoose from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "completed", "shipped"],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: Schema.Types.ObjectId, ref: "Address" },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
