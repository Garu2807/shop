import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductsState from './types/ProductState';
import * as api from './api';
import { Product, ProductId } from './types/Product';
const initialState: ProductsState = {
  products: [],
};
export const loadProducts = createAsyncThunk('prodcuts/loadProdcuts', () => {
  /* то, что возвращает thunk -> уходит в case  как action.payload */
  return api.getProducts();
});
const prodcutsSlice = createSlice({
  name: 'prodcuts',
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
export default prodcutsSlice.reducer;
