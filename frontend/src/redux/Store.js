import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
const myStore = configureStore({
  reducer: { product: productSlice },
});
export default myStore;
