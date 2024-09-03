import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Item = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  height: 200px;
  text-align: left;
  img {
    width: 100%;
    height: 100%;
  }
`;
