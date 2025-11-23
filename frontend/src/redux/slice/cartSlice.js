/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cartItem",
  initialState: {
    items: window.localStorage.getItem("myStoreCartItem")
      ? JSON.parse(window.localStorage.getItem("myStoreCartItem"))
      : [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
      window.localStorage.setItem("myStoreCartItem", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      window.localStorage.setItem("myStoreCartItem", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            quantity: item.quantity > 2 ? item.quantity - 1 : 1,
          };
        }
        return item;
      });
      window.localStorage.setItem("myStoreCartItem", JSON.stringify(state.items));
    },
    deleteCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
      window.localStorage.setItem("myStoreCartItem", JSON.stringify(state.items));
    },
    flushCart: (state, action) => {
      state.items = [];
      window.localStorage.setItem("myStoreCartItem", JSON.stringify(state.items));
    },
  },
});
export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
  flushCart,
} = cartSlice.actions;
export default cartSlice.reducer;
