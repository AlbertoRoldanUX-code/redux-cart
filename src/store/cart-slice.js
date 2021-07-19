import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    add(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.items.push({
          id: action.payload.id,
          price: action.payload.price,
          quantity: 1,
          totalPrice: action.payload.price,
          name: action.payload.title,
        });
      }

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice =
          existingItem.totalPrice + action.payload.price;
      }
      state.totalQuantity++;
    },

    increase(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      state.totalQuantity++;
    },

    decrease(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      existingItem.quantity--;

      existingItem.totalPrice = existingItem.totalPrice - existingItem.price;

      state.totalQuantity--;
    },
  },
});

export const cartActions = cartSlice.actions;
