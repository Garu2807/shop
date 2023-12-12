import React from 'react';
import { useAppDispatch } from '../../store';
import { authorization } from '../auth/authSlice';
import './modal.css';
import Autorization from '../auth/Autorization';
import Registration from '../auth/Registration';

export type ModalProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ active, setActive }: ModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  // const handleModalClick = (): void => {
  //   console.log('Modal clicked');
  //   setActive(false);
  // };

  return (
    <div className="submodal">
      <div
        className={active ? 'modal active' : 'modal'}
        onClick={() => setActive(false)}
      >
        <div
          className={active ? 'modal_content active' : 'modal_content'}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Например, вот как можно использовать компонент Autorization: */}
          <div className="Войти">
            <Autorization />
          </div>

          <div className="Создать аккаунт">
            <Registration />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
