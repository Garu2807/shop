import React, { StrictMode, useEffect, useState } from 'react';
// import logo from './logo.svg';
import ProductList from '../features/products/ProductList';
import NavBar from '../features/navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import { authCheckUser } from '../features/auth/authSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import CartList from '../features/cart/CartList';
import ProductTable from '../features/products/ProductTable';
import { loadProducts } from '../features/products/ProductSlice';
import CartModal from '../features/cart/CartModal';
import styles from './App.module.css';
// import NavBar from '../features/navbar/NavBar';

function App(): JSX.Element {
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  useEffect(() => {
    dispatch(loadProducts());
    dispatch(authCheckUser());
  }, []);

  const handleOpenCart = (): void => setOpenCart(true);
  const handleCloseCart = (): void => setOpenCart(false);
  return (
    <div className={styles.App}>
      <NavBar handleOpenCart={handleOpenCart} />
      {user?.isAdmin ? (
        <ProductTable />
      ) : (
        <>
          <Routes>
            <Route path="/cart" element={<CartList />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
          <CartModal open={openCart} handleClose={handleCloseCart} />
        </>
      )}
    </div>
  );
}

export default App;
