import { createSlice } from '@reduxjs/toolkit';
import { loadJson, saveJson } from '../utils/storage';

const storageKey = 'cartItems';

const initialState = {
  cartItems: loadJson(storageKey, []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      saveJson(storageKey, state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      saveJson(storageKey, state.cartItems);
    },

    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === id);

      if (item) {
        item.quantity = Math.max(1, item.quantity + amount);
        saveJson(storageKey, state.cartItems);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveJson(storageKey, state.cartItems);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
