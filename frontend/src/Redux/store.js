import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";
import productReducer from './product/productSlice'
import filteredProductReducer from './product/filterProductSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    filteredProducts: filteredProductReducer

  },
});

export default store;
