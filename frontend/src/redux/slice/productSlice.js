import { createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../../customHooks/FetchData";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: window.localStorage.getItem("myStoreProducts")
      ? JSON.parse(window.localStorage.getItem("Products"))
      : await FetchData("https://dummyjson.com/products?limit=194", "GET").then(
          (res) => res.products
        ),
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});
export const { addItem } = productSlice.actions;
export default productSlice.reducer;
