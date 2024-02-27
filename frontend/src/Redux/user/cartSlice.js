import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  cartData: JSON.parse(localStorage.getItem("cartData")) || null,
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || null,
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      localStorage.setItem("cartData", JSON.stringify(action.payload.cartData));
      localStorage.setItem(
        "cartItems",
        JSON.stringify(action.payload.cartItems)
      );

      state.cartData = action.payload.cartData;
      state.cartItems = action.payload.cartItems;
    });
  },
});

export default cartSlice.reducer;
