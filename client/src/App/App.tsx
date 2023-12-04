import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ProductList from '../features/products/ProductList';
import NavBar from '../features/navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Registration from '../features/auth/Registration';
import Autorization from '../features/auth/Autorization';
// import NavBar from '../features/navbar/NavBar';

function App(): JSX.Element {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />

        <Route path="/registration" element={<Registration />} />
        <Route path="/autorization" element={<Autorization />} />
      </Routes>
    </div>
  );
}

export default App;
