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
  transition: opacity 0.4s, pointer-events 0.4s;
  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${(props) => (props.active ? 'all' : 'none')};
`;

export const StyledModalContent = styled.div<ModalProps>`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  width: 360px;
  transition: transform 0.4s, opacity 0.4s;
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(0.5)')};
  opacity: ${(props) => (props.active ? 1 : 0)};
`;