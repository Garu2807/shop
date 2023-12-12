import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, registration } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../store';

function Registration(): JSX.Element {
  const { error, user } = useAppSelector((store) => store.auth);
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(registration({ name, email, password }));
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="regForm">
        <label className="form_label">
          Name
          <input
            value={name}
            onChange={(e) => SetName(e.target.value)}
            type="text"
          />
        </label>
        <label className="form_label">
          Email
          <input
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            type="text"
          />
        </label>
        <label className="form_label">
          Password
          <input
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            type="text"
          />
        </label>
        <button type="submit">Создать акканут</button>
      </form>
    </div>
  );
}

export default Registration;
