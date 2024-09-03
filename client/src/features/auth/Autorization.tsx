import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { authorization } from './authSlice';
import './style.css';

type AuthorizationProps = {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAuthMode: () => void;
};

const Authorization: React.FC<AuthorizationProps> = ({
  setModalActive,
  toggleAuthMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateEmail = (email: string): boolean => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Email и пароль не могут быть пустыми');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Некорректный email');
      return;
    }

    try {
      await dispatch(
        authorization({ email: email.trim(), password: password.trim() })
      ).unwrap();
      setError('');
      setModalActive(false);
      navigate('/');
    } catch (authError: unknown) {
      if (
        authError instanceof Error &&
        authError.message === 'User not found'
      ) {
        setError('Пользователь не найден. Хотите зарегистрироваться?');
      } else {
        setError(
          'Ошибка авторизации. Проверьте введенные данные и попробуйте снова.'
        );
      }
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={onHandleSubmit} className="authForm">
        <div className="inputs">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="inputs">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
        </div>
        {error && (
          <div className="error">
            {error}{' '}
            {error === 'Пользователь не найден. Хотите зарегистрироваться?' && (
              <button type="button" onClick={toggleAuthMode}>
                Зарегистрироваться
              </button>
            )}
          </div>
        )}
        <button type="submit" className="authBtn">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Authorization;
