import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartState } from './types/CartState';
import { Product } from '../products/types/Product';
import * as api from './api';

const initialState: CartState = {
  cart: [],
  totalQuantity: 0,
  error: undefined,
};

// Асинхронный экшен для получения корзины
export const getCart = createAsyncThunk('cart/getCart', async () => {
  const response = await api.getCart();
  return response;
});

// Асинхронный экшен для получения общего количества товаров в корзине
export const fetchCartQuantity = createAsyncThunk(
  'cart/fetchQuantity',
  async () => {
    const response = await api.fetchCartQuantity();
    return response.totalQuantity;
  }
);

// Асинхронный экшен для добавления товара в корзину
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product: Product) => {
    const response = await api.addToCart(product);
    return response.totalQuantity;
  }
);

// Асинхронный экшен для обновления количества товара в корзине
export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ id, quantity }: { id: number; quantity: number }) => {
    const response = await api.updateCartQuantity({ id, quantity });
    return response.totalQuantity;
  }
);

// Асинхронный экшен для удаления товара из корзины
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: number) => {
    const response = await api.removeFromCart(productId);
    return { productId, totalQuantity: response.totalQuantity };
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCart.fulfilled,
      (
        state,
        action: PayloadAction<{ cart: Product[]; totalQuantity: number }>
      ) => {
        state.cart = action.payload.cart;
        state.totalQuantity = action.payload.totalQuantity;
      }
    );

    builder.addCase(
      fetchCartQuantity.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.totalQuantity = action.payload;
      }
    );

    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.totalQuantity = action.payload;
      }
    );

    builder.addCase(
      updateCartQuantity.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.totalQuantity = action.payload;
      }
    );

    builder.addCase(
      removeFromCart.fulfilled,
      (
        state,
        action: PayloadAction<{ productId: number; totalQuantity: number }>
      ) => {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload.productId
        );
        state.totalQuantity = action.payload.totalQuantity;
      }
    );
  },
});

export default cartSlice.reducer;
