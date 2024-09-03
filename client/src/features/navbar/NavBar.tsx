import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logOut } from '../auth/authSlice';
import { fetchCartQuantity } from '../cart/cartSlice';
import { LuShoppingCart } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import Modal from '../modal/Modal';

function NavBar(): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      // Проверка на наличие пользователя перед отправкой запроса
      dispatch(fetchCartQuantity());
    }
  }, [dispatch, user]);

  const onHandleLogOut: React.MouseEventHandler<HTMLAnchorElement> = async (
    e
  ) => {
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
              alt="Farfetch Logo"
              width={201}
            />
          </Link>
          <Link to="/cart">
            <button className="open_btn">
              <LuShoppingCart />
              <span className="cart-counter">{totalQuantity}</span>{' '}
              {/* Отображение количества товаров в корзине */}
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
