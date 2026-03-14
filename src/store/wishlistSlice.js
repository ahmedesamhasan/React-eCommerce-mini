import { createSlice } from '@reduxjs/toolkit';
import { loadJson, saveJson } from '../utils/storage';

const storageKey = 'wishlistItems';

const initialState = {
  wishlistItems: loadJson(storageKey, []),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const alreadySaved = state.wishlistItems.some((item) => item.id === product.id);

      state.wishlistItems = alreadySaved
        ? state.wishlistItems.filter((item) => item.id !== product.id)
        : [...state.wishlistItems, product];

      saveJson(storageKey, state.wishlistItems);
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
      saveJson(storageKey, state.wishlistItems);
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
