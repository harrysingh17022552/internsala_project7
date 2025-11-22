import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import userSlice from "./slice/userSlice";
const myStore = configureStore({
  reducer: { product: productSlice, cart: cartSlice, user: userSlice },
});
export default myStore;
