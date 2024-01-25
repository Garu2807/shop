import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserState from '../user/types/userState';
import * as api from './api';
import { CartState } from './types/CartState';
import { Product } from '../products/types/Product';
const initialState: CartState = {
  cart: [],
  error: undefined,
};

export const getCarts = createAsyncThunk('cart/getCarts', () => {
  /* то, что возвращает thunk -> уходит в case  как action.payload */
  return api.getCarts();
});
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  (product: Product) => {
    /* то, что возвращает thunk -> уходит в case  как action.payload */
    return api.addToCart(product);
  }
);
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCarts.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(getCarts.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart.push(action.payload);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

// export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
