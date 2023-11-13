import { Link } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store';
import './style.css';
import React from 'react';
// import { MouseEventHandler } from 'react';
// import logo from './logo.svg';

function NavBar(): JSX.Element {
  return (
    <header>
      <div className="navbar">
        <div className="links">
          <Link to="/">Logo</Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
