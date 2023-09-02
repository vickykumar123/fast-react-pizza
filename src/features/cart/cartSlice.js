import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /*   cart: [{
    pizzaId: 12,
      name:"Mediterrna",
      quantity: 1,
      unitPrice: 32,
      totalPrice: unitPrice * 1,
  }],*/
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      //here payload is newItem
      state.cart.push(action.payload);
    },
    deleteItems(state, action) {
      // here payload is id that needs to delete
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // here payload is id that needs to increase
      const item = state.cart.find((items) => items.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      // here payload is id that needs to decrease
      const item = state.cart.find((items) => items.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0)
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItems,
  deleteItems,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCurrentItemQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
