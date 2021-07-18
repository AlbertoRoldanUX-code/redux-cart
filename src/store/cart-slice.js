import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { isShowing: false },
  reducers: {
    toggle(state) {
      state.isShowing = !state.isShowing;
    },
  },
});

export const cartActions = cartSlice.actions;
