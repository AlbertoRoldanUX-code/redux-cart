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
          itemId: action.payload.id,
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
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingCartItemIndex];
      existingItem.quantity++;
      state.totalQuantity++;
    },

    decrease(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingCartItemIndex];

      existingItem.quantity--;
      state.totalQuantity--;
    },

    remove(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem.quantity === 1) {
        state.items.pop(existingItem);
      }
      state.totalQuantity--;
    },
  },
});

export const cartActions = cartSlice.actions;
