import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { authorization } from './authSlice';
import './style.css';

type AuthorizationProps = {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Autorization: React.FC<AuthorizationProps> = ({ setModalActive }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateEmail = (email: string): boolean => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault(); // Отмена действия по умолчанию формы

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
      setError(''); // Очистка ошибок при успешной авторизации
      setModalActive(false); // Закрытие модального окна при успешной авторизации
      navigate('/'); // Переход на другую страницу (если требуется)
    } catch (authError) {
      setError(
        'Ошибка авторизации. Проверьте введенные данные и попробуйте снова.'
      );
      // Не закрываем модальное окно при ошибке
    }
  };

  return (
    <>
      <div className="form__container">
        <form onSubmit={onHadleSubmit} className="authForm">
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
          {error && <div className="error">{error}</div>}
          <button type="submit" className="authBtn">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Autorization;
