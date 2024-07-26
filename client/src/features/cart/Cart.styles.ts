import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
`;
export const StyledDeleteButton = styled(IoMdClose)`
  cursor: pointer;
  height: 30px;
  width: 30px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  &:hover {
    background-color: #e6e6e6;
    color: red;
  }
`;
export const Item = styled.div`
  padding: 24px;
  border-top: 1px solid gray;
  width: 60%;
  height: 200px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  img {
    width: 150px;
    height: 150px;
  }
`;
export const Spec = styled.div`
  text-align: left;
  width: 25%;
`;
export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 1%;
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
