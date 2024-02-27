import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";
import productReducer from './product/productSlice'
import filteredProductReducer from './product/filterProductSlice'
import cartReducer from './user/cartSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    filteredProducts: filteredProductReducer,
    cart: cartReducer

  },
});

export default store;
