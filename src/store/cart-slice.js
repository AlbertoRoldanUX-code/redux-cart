import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] },
  reducers: {
    add(state, action) {
      state.cart = [...state.cart, action.payload];
    },
  },
});

export const cartActions = cartSlice.actions;
