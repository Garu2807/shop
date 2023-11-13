import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ProductList from '../features/products/ProductList';
import NavBar from '../features/navbar/NavBar';
// import NavBar from '../features/navbar/NavBar';

function App(): JSX.Element {
  return (
    <div className="App">
      <NavBar />
      <ProductList />
    </div>
  );
}

export default App;
