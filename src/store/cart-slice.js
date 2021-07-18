import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { isShowing: false },
  reducers: {
    show(state) {
      state.cart = true;
    },
    hide(state) {
      state.cart = false;
    },
  },
});

export const cartActions = cartSlice.actions;
