/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cartItem",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
    },
    increaseQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
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
    },
    deleteCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
    },
    flushCart: (state, action) => {
      state.items = [];
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
