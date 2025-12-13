import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { styled as muiStyled } from '@mui/system';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledCartIcon = muiStyled(ShoppingBagOutlinedIcon)(
  ({ theme }) => ({
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    color: 'black',
    borderRadius: '12px',
    fontSize: '2.5rem',
    '&:hover': {
      backgroundColor: 'rgba(211, 211, 211, 0.5)',
      transform: 'scale(1.1)',
    },
  })
);
export const StyledLogoutIcon = muiStyled(LogoutOutlinedIcon)(({ theme }) => ({
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  color: 'black',
  borderRadius: '12px',
  fontSize: '2rem',
  '&:hover': {
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    transform: 'scale(1.1)',
  },
}));
// export const StyledLink = muiStyled(Link)(({ theme }) => ({
//     // display: 'inline-flex',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     // backgroundColor: 'transparent',
//     // transition: 'background-color 0.3s ease, transform 0.3s ease',
//     // color: 'black',
//     // borderRadius: '12px',
//     // padding: '8px',
//     // '&:hover': {
//     //   backgroundColor: 'rgba(211, 211, 211, 0.5)',
//     //   transform: 'scale(1.1)',
//     // },
//   }));

export const StyledAuthIcon = muiStyled(Person2OutlinedIcon)(({ theme }) => ({
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  color: 'black',
  borderRadius: '12px',
  fontSize: '2rem',
  '&:hover': {
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    transform: 'scale(1.1)',
  },
}));
export const CartCounter = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: red;
  color: white;
  border-radius: 50%;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  transform: translate(30%, -30%);
`;
