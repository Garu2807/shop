import { Modal, Box, Typography, Button } from '@mui/material';
import CartList from '../cart/CartList';
import { modalStyle } from '../cart/Cart.styles';
import { JSX } from 'react';

type CartModalProps = {
  open: boolean;
  handleClose: () => void;
};

function CartModal({ open, handleClose }: CartModalProps): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="cart-modal-title" variant="h6" component="h2">
          Ваша корзина
        </Typography>
        <CartList />
      </Box>
    </Modal>
  );
}

export default CartModal;
