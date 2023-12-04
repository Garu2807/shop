import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { authorization } from './authSlice';

function Autorization(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(authorization({ email, password }));
    navigate('/');
  };
  return (
    <div className="form__container">
      <Link to="/autorization" className="link">
        Войти
      </Link>
      <Link to="/registration" className="link">
        Создать аккаунт
      </Link>
      <form onSubmit={onHadleSubmit} className="form__add-animal">
        <label className="form__label">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </label>
        <label className="form__label">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Autorization;
