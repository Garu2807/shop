import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productsReducer from './features/products/ProductSlice';
const store = configureStore({
  reducer: { products: productsReducer },
});

// для правильной типизации будем использовать useAppDispatch вместоuseDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

/* Какой тип будет у функции store.getState -> тот и будет типа RootState */
export type RootState = ReturnType<typeof store.getState>;

export default store;
