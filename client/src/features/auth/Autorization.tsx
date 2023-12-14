import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { authorization } from './authSlice';
import './style.css';
import Modal from '../modal/Modal';
// Authorization.tsx
type AuthorizationProps = {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Autorization: React.FC<AuthorizationProps> = ({ setModalActive }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(authorization({ email, password }));
    setModalActive(false);
    navigate('/');
  };

  return (
    <>
      <div className="form__container">
        <form onSubmit={onHadleSubmit} className="authForm">
          <div className="inputs">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="inputs">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Пароль"
            />
          </div>

          <button type="submit" className="authBtn">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Autorization;
