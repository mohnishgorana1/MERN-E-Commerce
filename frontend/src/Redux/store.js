import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/authSlice";
import productReducer from './product/productSlice'
import cartReducer from './user/cartSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer
  },
});

export default store;
