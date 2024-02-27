import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res, next) => {
  try {
    console.log(req.body);
    const { productId, quantity } = req.body;

    // find product
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Not found product");
      return res
        .status(405)
        .json({ success: false, message: "Product not found" });
    }

    // Find the user and update the cart
    const userId = req.user.id;
    console.log("userID", userId);
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      console.log("Not found user");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the user already has a cart
    let cart = user.cart;

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      cart = await Cart.create({ user: userId });
      user.cart = cart._id;
      await user.save();
    }

    console.log("user", user);
    const existingCartItem = cart?.items.find((item) =>
      item.product.equals(product._id)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.items.push({ product: product._id, quantity });
    }

    // Calculate the subtotal
    cart.subTotal += product.price * quantity;

    // Save the updated user and cart
    await user.save();
    await cart.save();

    // fetch the cart items with details
    const updatedCart = await Cart.findById(cart._id).populate('items.product')
    
    res.status(200).json({
      success: true,
      message: "Product added to the cart successfully",
      cartData: cart,
      cartItems: updatedCart.items
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
