import { Link } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store';
import './style.css';
import React from 'react';
// import { MouseEventHandler } from 'react';
// import logo from './logo.svg';
//route
function NavBar(): JSX.Element {
  return (
    <header>
      <div className="navbar">
        <div className="links">
          <Link to="/">
            <img
              src="https://uploads-ssl.webflow.com/610ed44d42af524518f29b2a/61472bd3b48ecccd04f479f2_farfetch%20logo-p-1080.png"
              alt=""
              width={201}
            />
          </Link>
          <Link to="/authorization">Войти</Link>
          <Link to="/cart">Корзина</Link>
          
        </div>
      </div>
    </header>
  );
}

export default NavBar;
