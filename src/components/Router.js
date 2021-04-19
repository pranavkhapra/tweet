/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

function Router({ isLoggedIn }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route path="/" component={Home} />
            </>
          ) : (
            <>
              <Route path="/" component={Auth} />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
