import mongoose from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
      avatar: { type: String },
      contact: {
        phone: { type: String },
        address: { type: Schema.Types.ObjectId, ref: "Address" },
      },
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    wishlist: { type: Schema.Types.ObjectId, ref: "Wishlist" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
