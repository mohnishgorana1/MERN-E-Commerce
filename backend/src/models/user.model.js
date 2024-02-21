import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
      avatar: {
        public_id: { type: String },
        secure_url: { type: String },
      },
      contact: {
        phone: { type: String },
        address: { type: String },
      },
    },
    isVerified: { type: Boolean, default: false },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    wishlist: { type: Schema.Types.ObjectId, ref: "Wishlist" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // stop fn
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  async jwtToken() {
    return await Jwt.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  },

  async comparePassword(plainTextPassword) {
    console.log(
      `PLAIN: ${typeof plainTextPassword} this: ${typeof this.password}`
    );
    return await bcrypt.compare(plainTextPassword, this.password);
  },

  async generatePasswordResetToken() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // isi resetToken ke jariye me is user ke liye forgetPasswordToken bhi bna dunga
    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },
};

export const User = mongoose.model("User", userSchema);
