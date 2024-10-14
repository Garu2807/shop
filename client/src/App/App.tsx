import React, { StrictMode, useEffect, useState } from 'react';
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
import { RootState, useAppDispatch, useAppSelector } from '../store';
import CartList from '../features/cart/CartList';
import { useSelector } from 'react-redux';
import ProductTable from '../features/products/ProductTable';
// import NavBar from '../features/navbar/NavBar';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadProducts());
    dispatch(authCheckUser());
  }, []);
  return (
    <div className="App">
      <NavBar />
      {user?.isAdmin ? (
        <ProductTable />
      ) : (
        <Routes>
          <Route path="/cart" element={<CartList />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
