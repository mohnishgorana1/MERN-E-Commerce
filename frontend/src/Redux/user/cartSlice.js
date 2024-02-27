import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    try {
      const response = await axios.post(
        "/api/v1/cart/addToCart",
        { productId, quantity },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success("Product added to the cart");
      return response;
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
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {});
  },
});

export default cartSlice.reducer;
