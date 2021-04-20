import React, { useState, useEffect } from 'react';
import Router from './Router';
import { authService } from '../base';
import loadingImage from '../images/loading.svg';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObject={userObject} />
      ) : (
        <img src={loadingImage} alt="loading..." />
      )}
    </div>
  );
}

export default App;
