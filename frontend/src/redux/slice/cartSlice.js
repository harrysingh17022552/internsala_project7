/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

//cart slice, initially its value is empty array or if already added item to cart then it checks local storage, if there then it is assigned
const cartSlice = createSlice({
  name: "cartItem",
  initialState: {
    items: window.localStorage.getItem("myStoreCartItem")
      ? JSON.parse(window.localStorage.getItem("myStoreCartItem"))
      : [],
  },
  reducers: {
    // this reducer push payload item to the array by adding base quantity on it and also update/create localstorage
    addItem: (state, action) => {
      state.items.push({ ...action.payload, quantity: 1 });
      window.localStorage.setItem(
        "myStoreCartItem",
        JSON.stringify(state.items)
      );
    },

    //this two reducers update the quantity of product by taking there id as payload, after that it find that product and increase/decrease there quantity
    increaseQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      window.localStorage.setItem(
        "myStoreCartItem",
        JSON.stringify(state.items)
      );
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
      window.localStorage.setItem(
        "myStoreCartItem",
        JSON.stringify(state.items)
      );
    },

    //this reducer delete item from the array by id from payload
    deleteCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
      window.localStorage.setItem(
        "myStoreCartItem",
        JSON.stringify(state.items)
      );
    },

    //this flush out the array to empty array
    flushCart: (state, action) => {
      state.items = [];
      window.localStorage.setItem(
        "myStoreCartItem",
        JSON.stringify(state.items)
      );
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
