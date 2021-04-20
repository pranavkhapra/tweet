/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from '../routes/Profile';

function Router({ isLoggedIn, userObject, refreshUser }) {
  return (
    <div
      style={{
        maxWidth: 890,
        width: '100%',
        margin: '0 auto',
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BrowserRouter>
        <Switch>
          {isLoggedIn && <Navigation userObject={userObject} /> ? (
            <>
              <Navigation />
              <Route path="/">
                <Home userObject={userObject} />
              </Route>
              <Route path="/profile" />
              <Profile userObject={userObject} refreshUser={refreshUser} />
              <Redirect from="*" to="/" />
            </>
          ) : (
            <>
              <Route path="/" component={Auth} />
              <Redirect from="*" to="/" />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
