import React, { useState, useEffect } from 'react';
import Router from './Router';
import { authService } from '../base';
import loadingImage from '../images/loading.svg';

function App() {
  // app.js is basicaly handleing all the auth when user log out login and all
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <div>
      {init ? (
        <Router
          isLoggedIn={isLoggedIn}
          userObject={userObject}
          refreshUser={refreshUser}
        />
      ) : (
        <img src={loadingImage} alt="loading..." />
      )}
    </div>
  );
}

export default App;
