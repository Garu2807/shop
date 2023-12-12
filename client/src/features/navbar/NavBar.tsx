// import { useAppDispatch, useAppSelector } from '../store';
import './style.css';
import userIMG from '../../icons/user.svg';
import React, { useId, useState } from 'react';
import Registration from '../auth/Registration';
import { Route, Routes, Link } from 'react-router-dom';
import Modal from '../modal/Modal';
function NavBar(): JSX.Element {
  const [modalActive, setModalActive] = useState(false);
  return (
    <header>
      <div className="navbar">
        <button className="open_btn" onClick={() => setModalActive(true)}>
          <img src={userIMG} alt="Войти" />
        </button>

        <div className="links">
          <Link to="/">
            <img
              src="https://uploads-ssl.webflow.com/610ed44d42af524518f29b2a/61472bd3b48ecccd04f479f2_farfetch%20logo-p-1080.png"
              alt=""
              width={201}
            />
          </Link>
          {/* <Link to="/autorization" className="link">
            <img src={userIMG} alt="" width={20} />
          </Link> */}
          <Modal active={modalActive} setActive={setModalActive} />
          <Link to="/cart">Корзина</Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
