import React, { useState } from 'react';
import Authorization from '../auth/Autorization';
import Registration from '../auth/Registration';
import {
  StyledModal,
  StyledModalContent,
  AuthButton,
  Title,
  MainReg,
  AuthButtons,
  AuthorizationContainer,
} from './Modal.styles';

type ModalProps = {
  active: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

enum AuthMode {
  Login,
  Register,
}

const Modal: React.FC<ModalProps> = ({ active, setModalActive }) => {
  const [authMode, setAuthMode] = useState(AuthMode.Login);

  const toggleAuthMode = (): void => {
    setAuthMode((prevMode) =>
      prevMode === AuthMode.Login ? AuthMode.Register : AuthMode.Login
    );
  };

  const log = (
    <AuthorizationContainer>
      <Authorization
        setModalActive={setModalActive}
        toggleAuthMode={toggleAuthMode}
      />
    </AuthorizationContainer>
  );
  const reg = (
    <AuthorizationContainer>
      <Registration setModalActive={setModalActive} />
    </AuthorizationContainer>
  );

  return (
    <StyledModal active={active} onClick={() => setModalActive(false)}>
      <StyledModalContent active={active} onClick={(e) => e.stopPropagation()}>
        <MainReg>
          <Title>Войдите или создайте аккаунт</Title>
          <AuthButtons>
            <AuthButton
              onClick={() => setAuthMode(AuthMode.Login)}
              isActive={authMode === AuthMode.Login}
            >
              Вход
            </AuthButton>
            <AuthButton
              onClick={() => setAuthMode(AuthMode.Register)}
              isActive={authMode === AuthMode.Register}
            >
              Регистрация
            </AuthButton>
          </AuthButtons>
          {authMode === AuthMode.Login ? log : reg}
        </MainReg>
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
