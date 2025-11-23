import { createSlice } from "@reduxjs/toolkit";
import { FetchData } from "../../customHooks/FetchData";

//product slice , whose initial value is items fetched from url, we also used local storage here but not currently using, so it will always takes the item by fetching
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
    //currently no use, but designed to add new item, which push the new item in existing array
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});
export const { addItem } = productSlice.actions;
export default productSlice.reducer;
