import UserState from '../user/types/userState';
import * as api from './api';
import { CartState } from './types/CartState';
import { Product, ProductId } from '../products/types/Product';
import { Cart, CartId } from './types/Cart';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
const initialState: CartState = {
  cart: [],

  quantity: 0,
  error: undefined,
};

export const getCarts = createAsyncThunk('cart/getCarts', () => {
  /* то, что возвращает thunk -> уходит в case  как action.payload */
  return api.getCarts();
});
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  (products_id: ProductId) => api.removeFromCart(products_id)
);
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  (product: Product) => {
    /* то, что возвращает thunk -> уходит в case  как action.payload */
    return api.addToCart(product);
  }
);
// export const updateCartQuantity = createAsyncThunk(
//   'cart/updateCartQuantity',
//   (cart: Cart) => api.updateCartQuantity(cart)
// );

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
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((v) => v.id !== Number(action.payload));
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      console.log(action.error);
    });
    // builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
    //   state.cart = state.cart.map((c) =>
    //     c.id !== action.payload.id ? c : action.payload
    //   );
    // });
    // builder.addCase(updateCartQuantity.rejected, (state, action) => {
    //   console.log(action.error);
    // });
  },
});

export default cartSlice.reducer;
