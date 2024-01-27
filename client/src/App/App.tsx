import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import ProductList from '../features/products/ProductList';
import NavBar from '../features/navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Registration from '../features/auth/Registration';
import Autorization from '../features/auth/Autorization';
import Modal from '../features/modal/Modal';
import { authCheckUser } from '../features/auth/authSlice';
import { loadProducts } from '../features/products/ProductSlice';
import { useAppDispatch } from '../store';
import CartPage from '../features/cart/CartList';
import { getCarts } from '../features/cart/cartSlice';
// import NavBar from '../features/navbar/NavBar';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProducts());
    dispatch(authCheckUser());
  }, [dispatch]);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
