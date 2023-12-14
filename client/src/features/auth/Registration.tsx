import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, registration } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import './style.css';
type RegistrationProps = {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const Registration: React.FC<RegistrationProps> = ({ setModalActive }) => {
  const { error, user } = useAppSelector((store) => store.auth);
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(registration({ name, email, password }));
    setModalActive(false);
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="authForm">
        <div className="inputs">
          <input
            value={name}
            onChange={(e) => SetName(e.target.value)}
            type="text"
            placeholder="Имя"
          />
        </div>
        <div className="inputs">
          <input
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="inputs">
          <input
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            type="text"
            placeholder="Пароль"
          />
        </div>

        <button type="submit" className="authBtn">
          Создать акканут
        </button>
      </form>
    </div>
  );
}

export default Registration;
