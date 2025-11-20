import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
const myStore = configureStore({
  reducer: { product: productSlice, cart: cartSlice },
});
export default myStore;
