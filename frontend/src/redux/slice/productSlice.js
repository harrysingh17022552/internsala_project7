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
    filterItems: [],
  },
  reducers: {
    //currently no use, but designed to add new item, which push the new item in existing array
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    //this reducer stores the item that are searched initially with all items
    filterItem: (state, action) => {
      if (typeof action.payload.key == "object") {
        state.filterItems = action.payload.key;
      } else if (typeof action.payload.key == "string") {
        state.filterItems = state.items.filter(
          (item) =>
            item.title
              .toLowerCase()
              .includes(action.payload.key.toLowerCase()) ||
            item.tags.includes(action.payload.key.toLowerCase()) ||
            item.category.includes(action.payload.key.toLowerCase())
        );
      }
    },
  },
});
export const { addItem, filterItem } = productSlice.actions;
export default productSlice.reducer;
