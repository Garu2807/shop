import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductsState from './types/ProductState';
import * as api from './api';
import { Product, ProductFormInput, ProductId } from './types/Product';

const initialState: ProductsState = {
  products: [],
};

// Загрузка продуктов
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    return api.getProducts();
  }
);

// Добавление продукта
export const addProducts = createAsyncThunk(
  'products/addProducts',
  async (newProduct: ProductFormInput) => {
    const response = await api.addProducts(newProduct);
    return response; // здесь возвращаем новый продукт с `id`
  }
);

// Удаление продукта
export const removeProducts = createAsyncThunk(
  'products/removeProducts',
  async (productId: ProductId) => {
    await api.removeProduct(productId);
    return productId; // Возвращаем productId, чтобы использовать его в reducer
  }
);
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Product) => {
    return api.updateProduct(product);
  }
);

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
    builder.addCase(addProducts.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(addProducts.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(removeProducts.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (p) => p.id !== action.payload // Используем action.payload, который возвращает productId
      );
    });
    builder.addCase(removeProducts.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map((p) =>
        p.id !== action.payload.id ? p : action.payload
      );
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      /* тут обрабатывается ошибка */
      console.log(action.error);
    });
  },
});

export default productsSlice.reducer;
