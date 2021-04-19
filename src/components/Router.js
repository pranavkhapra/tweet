import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/" component={Home} />
          </>
        ) : (
          <Route path="/" component={Auth} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
