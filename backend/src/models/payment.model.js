import mongoose from "mongoose";

const paymentSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    method: {
      type: String,
      enum: ["credit_card", "paypal", "stripe", "razorpay"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionId: { type: String },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
