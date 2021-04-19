/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { authService, firebaseInstance } from '../base';

function Auth() {
  const [values, setValues] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
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
  const socialLogin = async (event) => {
    let provider;
    try {
      if (event.target.name === 'google') {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (event.target.name === 'github') {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      await authService.signInWithPopup(provider);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={onValuesChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password || ''}
          onChange={onValuesChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      {error}

      <div>
        <button type="button" name="github" onClick={socialLogin}>
          Continue With Github
        </button>
        <button type="button" name="google" onClick={socialLogin}>
          Continue With Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
