import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  products : null
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const response = await axios.get("/api/v1/products/getAllProducts");
      console.log("res",  response?.data?.products);
      toast.success("Product Fetched");
      return response?.data?.products
    } catch (error) {
      toast.error("Cant fetched All Products");
    }
  }
);

// Create a product slice
const filterProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload
      });
    },
});

// Export the reducer
export default filterProductsSlice.reducer;
