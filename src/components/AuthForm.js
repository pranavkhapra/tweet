/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { authService } from '../base';

const inputStyles = {};

function AuthForm() {
  const [values, setValues] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onValuesChange = (event) => {
    // check if its a number and convert
    const { value } = event.target;
    if (event.target.value === 'number') {
      parseInt(value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      // that somebody change we want to change but we can't  make it static so we make it dynamic
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        authService.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
      } else {
        authService.signInWithEmailAndPassword(values.email, values.password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={onValuesChange}
          className="authInput"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password || ''}
          onChange={onValuesChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>

      <div />
    </>
  );
}

export default AuthForm;
