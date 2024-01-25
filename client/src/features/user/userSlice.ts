import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import UserState from './types/userState';
const initialState: UserState = {
  cart: [],
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product: { id: any }) => product.id !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = userSlice.actions;

export default userSlice.reducer;
