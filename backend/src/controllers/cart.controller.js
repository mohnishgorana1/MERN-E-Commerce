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
    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to the cart successfully",
      cartData: cart,
      cartItems: updatedCart.items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const clearCart = async (req, res, next) => {
  try {
    // get user and retrieve cart
    const userId = req.user.id;
    console.log("userId: ", userId);
    const user = await User.findById(userId).populate("cart");

    // check user and cart
    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.cart) {
      console.log("Cart not found");
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    user.cart.items = []; // remove items from cart
    user.cart.subTotal = 0; // reset total
    await user.cart.save(); // save cart

    console.log("CART CLEARED");

    res
      .status(200)
      .json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartId = user.cart;
    if (!cartId) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Fetch the cart by its ID and populate the items array
    const cart = await Cart.findById(cartId).populate("items.product");
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Remove the item from the items array
    const filteredItems = cart.items.filter((item) => {
      const match = item.product._id.toString() !== productId.toString();
      return match;
    });

    cart.items = filteredItems;

    // Recalculate subtotal
    const newSubtotal = filteredItems.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    // Update subtotal in the cart
    cart.subTotal = newSubtotal;

    await cart.save();
    user.cart = cart;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Items deleted from cart successfully",
      cartData: cart,
      cartItems: cart.items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
