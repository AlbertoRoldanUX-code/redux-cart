import { createSlice } from '@reduxjs/toolkit';
import { uiSliceActions } from './ui-slice';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0, changed: false },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload?.totalQuantity || 0;
      state.items = action.payload?.items || [];
    },
    add(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.changed = true;
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
      state.changed = true;
    },

    decrease(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      existingItem.quantity--;

      existingItem.totalPrice = existingItem.totalPrice - existingItem.price;

      state.totalQuantity--;
    },
  },
});

export const sendCartData = function (cart) {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      })
    );

    const sendRequest = async function () {
      const res = await fetch(
        'https://react-http-484b3-default-rtdb.europe-west1.firebasedatabase.app/products.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!res.ok) throw new Error('Something went wrong');
    };

    try {
      await sendRequest();
      dispatch(
        uiSliceActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Data sent successfully!',
        })
      );
    } catch (err) {
      console.error(err);
      dispatch(
        uiSliceActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed.',
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-484b3-default-rtdb.europe-west1.firebasedatabase.app/products.json'
      );
      if (!response.ok) throw new Error('Something went wrong.');
      const data = await response.json();

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      console.error(error);
      dispatch(
        uiSliceActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed.',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
