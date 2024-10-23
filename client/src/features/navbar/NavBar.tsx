import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logOut } from '../auth/authSlice';
import { fetchCartQuantity } from '../cart/cartSlice';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ProudctAddForm from '../products/ProudctAddForm';
import Modal from '../modal/Modal';
import { ProductFormInput } from '../products/types/Product';
import {
  CartCounter,
  Container,
  StyledCartIcon,
  StyledLogoutIcon,
  StyledAuthIcon,
  Navbar,
  // StyledLink,
} from './NavBar.styles';

type NavbarProps = {
  handleOpenCart: () => void;
};

function NavBar({ handleOpenCart }: NavbarProps): JSX.Element {
  const { user } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const [modalActive, setModalActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartQuantity());
    }
  }, [dispatch, user]);

  const onHandleLogOut: MouseEventHandler<SVGSVGElement> = async (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  const emptyProduct: ProductFormInput = {
    name: '',
    img: '',
    brand: '',
    category: '',
    size: '',
    sex: '',
    price: 0,
    quantity: 0,
  };

  return (
    <header>
      <Navbar>
        {/* <div className="links"> */}
        <Link to="/">
          <img
            src="https://uploads-ssl.webflow.com/610ed44d42af524518f29b2a/61472bd3b48ecccd04f479f2_farfetch%20logo-p-1080.png"
            alt="Farfetch Logo"
            width={201}
          />
        </Link>
        {!user ? (
          <>
            <StyledAuthIcon onClick={() => setModalActive(true)} />
            <Modal active={modalActive} setModalActive={setModalActive} />
          </>
        ) : (
          <>
            {/* <Link to="/" onClick={onHandleLogOut}> */}
            <StyledLogoutIcon onClick={onHandleLogOut} />
            <Link to="/profile">
              <StyledAuthIcon />
            </Link>
            <Container onClick={handleOpenCart}>
              <StyledCartIcon />
              <CartCounter show={totalQuantity > 0}>
                {totalQuantity}
              </CartCounter>
            </Container>
            {user?.isAdmin && (
              <button className="open_btn" onClick={() => setShowForm(true)}>
                Добавление товара
              </button>
            )}
          </>
        )}
        {/* </div> */}
      </Navbar>
      {showForm && (
        <ProudctAddForm product={emptyProduct} setShowForm={setShowForm} />
      )}
      <Outlet />
    </header>
  );
}

export default NavBar;
