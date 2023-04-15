import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage({ onSuccess }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(true)

  useEffect(() => {
    const validateInputs = () => {
      if (credential.length >= 4 && password.length >= 6) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    };

    validateInputs();
  }, [credential, password]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(sessionActions.login({ credential, password }))

    if (data.errors) {
      setErrors([...data.errors]);
    } else if (onSuccess) {
      onSuccess();
    }
  }

  const demoLogin = async (e) => {
    e.preventDefault()
    setErrors([])

    const demoCrediential = 'demo@user.io'
    const demoPassword = 'password'
    const data = await dispatch(sessionActions.login({ credential: demoCrediential, password: demoPassword }))

    if (data.errors) {
      setErrors([...data.errors]);
    } else if (onSuccess) {
      onSuccess();
    }
  }



  return (
    <form onSubmit={handleSubmit} className="form">
      <ul className='ul'>
        {errors.map((error, idx) => <li key={idx} className="li">{error}</li>)}
      </ul>
      <label className='label'>
        Username or Email
        <input
          className='input'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}

        />
      </label>
      <label className='label'>
        Password
        <input
          className='input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </label>
      <button type="submit" className='button' disabled={disableButton || errors.length > 0}>Log In</button>

      <div className='demo-link-div'>
        <Link to="#" onClick={demoLogin} className="demo-link">Demo User</Link>
      </div>

    </form>
  );
}

export default LoginFormPage;
