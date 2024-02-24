import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const createProductAsync = createAsyncThunk(
  "products/create",
  async (productData) => {
    try {
      const response = await axios.post("/api/v1/products/createProduct", productData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("response", response);
      toast.success("Product created Successfully");
      return response?.data?.newProduct;
    } catch (error) {
      toast.error("Cant create Product");
    }
  }
);

// Create a product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products.push(action.payload);
    });
  },
});

// Export the reducer
export default productSlice.reducer;
