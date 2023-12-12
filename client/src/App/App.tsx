import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import ProductList from '../features/products/ProductList';
import NavBar from '../features/navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Registration from '../features/auth/Registration';
import Autorization from '../features/auth/Autorization';
import Modal from '../features/modal/Modal';
// import NavBar from '../features/navbar/NavBar';

function App(): JSX.Element {
  return (
    <div className="App">
      <NavBar />
      {/* <button className="open_btn" onClick={() => setModalActive(true)}>
        Рега
      </button> */}
      <Routes>
        <Route path="/" element={<ProductList />} />

        {/* <Route path="/registration" element={<Registration />} />
        <Route path="/autorization" element={<Autorization />} /> */}
      </Routes>
      {/* <Modal active={modalActive} setActive={setModalActive} /> */}
    </div>
  );
}

export default App;
