import { createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../../customHooks/FetchData";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: window.localStorage.getItem("products")
      ? JSON.parse(window.localStorage.getItem("products"))
      : await FetchData("https://dummyjson.com/products", "GET").then(
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
