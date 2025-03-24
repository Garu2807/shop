import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logOut } from '../auth/authSlice';
import { fetchCartQuantity } from '../cart/cartSlice';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ProudctAddForm from '../products/ProudctAddForm';
import Logo from '../../icons/VARFETCH.svg';
import Modal from '../modal/Modal';
import { ProductFormInput } from '../products/types/Product';
import {
  Container,
  StyledLogoutIcon,
  StyledAuthIcon,
  Navbar,
  StyledCartIcon,
  CartCounter,
} from './NavBar.styles';

type NavbarProps = {
  handleOpenCart: () => void;
};

function NavBar({ handleOpenCart }: NavbarProps): JSX.Element {
  const { user } = useAppSelector(state => state.auth);
  const totalQuantity = useAppSelector(state => state.cart.totalQuantity);
  const [modalActive, setModalActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(fetchCartQuantity());
    }
  }, [dispatch, user]);

  const onHandleLogOut: MouseEventHandler<SVGSVGElement> = async e => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <header>
      <Navbar>
        <Link to="/">
          <img src={Logo} alt="Farfetch Logo" width={201} />
        </Link>
        {!user ? (
          <>
            <StyledAuthIcon onClick={() => setModalActive(true)} />
            <Modal active={modalActive} setModalActive={setModalActive} />
          </>
        ) : (
          <>
            <StyledLogoutIcon onClick={onHandleLogOut} />
            {/* Показываем корзину только если пользователь не является администратором */}
            {!user.isAdmin && (
              <Container onClick={handleOpenCart}>
                <StyledCartIcon />
                <CartCounter show={totalQuantity > 0}>
                  {totalQuantity}
                </CartCounter>
              </Container>
            )}
            {user.isAdmin && (
              <Container>
                <Link to="/orders">Заказаы</Link>
              </Container>
            )}
          </>
        )}
      </Navbar>
      <Outlet />
    </header>
  );
}

export default NavBar;
