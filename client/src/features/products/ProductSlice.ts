import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductsState from './types/ProductState';
import * as api from './api';
const initialState: ProductsState = {
  products: [],
};
export const loadProducts = createAsyncThunk('products/loadProducts', () => {
  /* то, что возвращает thunk -> уходит в case  как action.payload */
  return api.getProducts();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(loadProducts.rejected, (state, action) => {
      console.log(action.error);
    });

  },
});
export default productsSlice.reducer;
