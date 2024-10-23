import { Button } from '@mui/material';
import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease;
  max-width: 700px;

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 8px;
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  text-align: center;
`;

export const Spec = styled.p`
  font-size: 1.1em;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

export const Price = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  color: #4caf50;
  margin-top: 10px;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    width: 30px;
    height: 30px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.2em;

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }
  }

  input {
    width: 50px;
    height: 30px;
    text-align: center;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export const modalStyle = {
  position: 'fixed',
  top: '0',
  right: '0',
  width: '420px',
  height: '100%',
  backgroundColor: 'white',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

export const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const RemoveButton = styled(Button)`
  background-color: #f44336 !important;
  color: white !important;
  margin-top: 10px;
  &:hover {
    background-color: #d32f2f !important;
  }
`;
