import React, { useState } from 'react';
// import './modal.css';
import Autorization from '../auth/Autorization';
import Registration from '../auth/Registration';
import { StyledModal, StyledModalContent } from './Modal.styles';

type ModalProps = {
  active: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

enum AuthMode {
  Login,
  Register,
}

function Modal({ active, setModalActive }: ModalProps): JSX.Element {
  const [authMode, setAuthMode] = useState(AuthMode.Login);
  const toggleAuthMode = () => {
    setAuthMode((prevMode) =>
      prevMode === AuthMode.Login ? AuthMode.Register : AuthMode.Login
    );
  };

  const log = (
    <div className="authorization">
      <Autorization setModalActive={setModalActive} />
    </div>
  );
  const reg = (
    <div className="authorization">
      <Registration setModalActive={setModalActive} />
    </div>
  );

  return (
    <div className="submodal">
      <StyledModal active={active} onClick={() => setModalActive(false)}>
        <StyledModalContent
          active={active}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mainReg">
            <div className="title">Войдите или создайте аккаунт</div>
            <div className="authButtons">
              <button
                onClick={() => setAuthMode(AuthMode.Login)}
                className={authMode === AuthMode.Login ? 'active' : ''}
              >
                Вход
              </button>
              <button
                onClick={() => setAuthMode(AuthMode.Register)}
                className={authMode === AuthMode.Register ? 'active' : ''}
              >
                Регистрация
              </button>
            </div>
            {authMode === AuthMode.Login ? log : reg}
          </div>
        </StyledModalContent>
      </StyledModal>
    </div>
  );
}

export default Modal;
