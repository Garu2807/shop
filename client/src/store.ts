import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import productsReducer from './features/products/ProductSlice';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: { products: productsReducer, auth: authReducer, cart: cartReducer },
});

// для правильной типизации будем использовать useAppDispatch вместоuseDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

/* Какой тип будет у функции store.getState -> тот и будет типа RootState */
export type RootState = ReturnType<typeof store.getState>;

export default store;
