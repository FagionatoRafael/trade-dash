import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from './Views/Dash/Dash';
import Login from './Views/Login/Login';
import Signin from './Views/signin/signin';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/signin" >
          <Signin />
        </Route>
        <Route path='/dash/:id'>
          <App />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
