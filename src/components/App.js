import React, { useState, useEffect } from 'react';
import Router from './Router';
import firebase from '../base';
import loadingImage from '../images/loading.svg';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <Router isLoggedIn={isLoggedIn} />
      ) : (
        <img src={loadingImage} alt="loading..." />
      )}
    </div>
  );
}

export default App;
