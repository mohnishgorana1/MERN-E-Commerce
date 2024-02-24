import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";
import productReducer from './product/productSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer
  },
});

export default store;
