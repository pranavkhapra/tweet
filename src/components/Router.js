/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from '../routes/Profile';

function Router({ isLoggedIn }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {isLoggedIn && <Navigation /> ? (
            <>
              <Navigation />
              <Route path="/" component={Home} />
              <Route path="/profile" component={Profile} />
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
    </>
  );
}

export default Router;
