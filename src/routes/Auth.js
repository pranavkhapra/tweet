/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { authService, firebaseInstance } from '../base';
import AuthForm from '../components/AuthForm';

function Auth() {
  const socialLogin = async (event) => {
    let provider;

    if (event.target.name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (event.target.name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color="#04AAFF"
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button
          type="button"
          name="github"
          onClick={socialLogin}
          className="authBtn"
        >
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
        <button
          type="button"
          name="google"
          onClick={socialLogin}
          className="authBtn"
        >
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  );
}

export default Auth;
