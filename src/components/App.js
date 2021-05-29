import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../scss/style.scss';
import Header from './Header';
import HomePage from './HomePage';
import Login from './Signin';
import Signup from './Signup';

function App() {
  return (
      <Router>
          <Header />
          <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={Signup} />
          </Switch>
      </Router>
  );
}

export default App;
