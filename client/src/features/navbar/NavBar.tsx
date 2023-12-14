// import { useAppDispatch, useAppSelector } from '../store';
import './style.css';
import userIMG from '../../icons/user.svg';
import React, { useId, useState } from 'react';
import Registration from '../auth/Registration';
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import Modal from '../modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store';
import { logOut } from '../auth/authSlice';
import { LuShoppingCart } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
function NavBar(): JSX.Element {
  const { user } = useAppSelector((store) => store.auth);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();

  const onHandleLogOut: React.MouseEventHandler<HTMLAnchorElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    dispatch(logOut());
  };
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
          <Link to="/cart">
            <button className="open_btn">
              <LuShoppingCart />
            </button>
          </Link>
          {!user ? (
            <>
              <button className="open_btn" onClick={() => setModalActive(true)}>
                <FaRegUser />
              </button>
              <Modal active={modalActive} setModalActive={setModalActive} />
            </>
          ) : (
            <>
              <li>Hello {user.name}</li>
              <a onClick={onHandleLogOut} className="nav__button" href="/">
                <button className="open_btn">
                  <CiLogout />
                </button>
              </a>
              <Link to="/profile">
                <button className="open_btn">
                  <FaRegUser />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </header>
  );
}

export default NavBar;
