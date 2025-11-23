import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import userSlice from "./slice/userSlice";
//Store of this project which have all reducer here : product, cart, user
const myStore = configureStore({
  reducer: { product: productSlice, cart: cartSlice, user: userSlice },
});
export default myStore;
