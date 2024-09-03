import styled from 'styled-components';

type ModalProps = {
  active: boolean;
};

export const StyledModal = styled.div<ModalProps>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    opacity 0.4s,
    pointer-events 0.4s;
  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};
`;

export const StyledModalContent = styled.div<ModalProps>`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  width: 360px;
  transition:
    transform 0.4s,
    opacity 0.4s;
  transform: ${({ active }) => (active ? 'scale(1)' : 'scale(0.5)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
`;

export const AuthButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#007bff' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  border: 1px solid #007bff;
  padding: 10px 20px;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#0056b3' : '#f0f0f0')};
  }
`;

export const Title = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const MainReg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const AuthorizationContainer = styled.div`
  width: 100%;
`;
