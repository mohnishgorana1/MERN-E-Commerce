import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const getCartLength = () => {
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let length = 0;
  storedCartItems.map((item) => {
    length += item.quantity;
  });
  return length;
};

const initialState = {
  cartData: JSON.parse(localStorage.getItem("cartData")) || null,
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || null,
  cartLength: getCartLength(),
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    try {
      const response = await axios.post("/api/v1/cart/addToCart", {
        productId,
        quantity,
      });
      console.log(response);
      toast.success("Product added to the cart");
      return response?.data;
    } catch (error) {
      toast.error("Failed to add product to the cart");
      throw error;
    }
  }
);

export const clearCartAsync = createAsyncThunk("cart/clear", async () => {
  try {
    const response = await axios.get("/api/v1/cart/clear");
    console.log(response);
    toast.success("Cart Cleared");
    return response?.data;
  } catch (error) {
    toast.error("Failed to add product to the cart");
    throw error;
  }
});

export const removeItemAsync = createAsyncThunk(
  "cart/removeItem",
  async (productId) => {
    try {
      const response = await axios.post("/api/v1/cart/removeItem", {
        productId,
      });
      console.log(response);
      toast.success("Item Removed");
      return response?.data;
    } catch (error) {
      toast.error("Failed to remove a product from the cart");
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      localStorage.removeItem("cartData");
      localStorage.removeItem("cartItems");

      state.cartData = null;
      state.cartItems = null;
      state.cartLength = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      localStorage.setItem("cartData", JSON.stringify(action.payload.cartData));
      localStorage.setItem(
        "cartItems",
        JSON.stringify(action.payload.cartItems)
      );

      state.cartData = action.payload.cartData;
      state.cartItems = action.payload.cartItems;

      let length = 0;
      state.cartItems?.map((item) => {
        length = length + Number(item?.quantity);
      });
      state.cartLength = length;
    });
    builder.addCase(clearCartAsync.fulfilled, (state, action) => {
      console.log("CART CLEAR SERVER ", action.payload);
      (state.cartData = null), (state.cartItems = null);
    });
    builder.addCase(removeItemAsync.fulfilled, (state, action) => {
      console.log(action.payload);

      state.cartData = action.payload.cartData;
      state.cartItems = action.payload.cartItems;

      let length = 0;
      state.cartItems?.map((item) => {
        length = length + Number(item?.quantity);
      });
      state.cartLength = length;

      localStorage.setItem("cartData", JSON.stringify(action.payload.cartData));
      localStorage.setItem(
        "cartItems",
        JSON.stringify(action.payload.cartItems)
      );
    });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
