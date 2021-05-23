import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../scss/style.scss';
import Header from './Header';
import Login from './Signin';
import Signup from './Signup';


function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/sign-in" component={Login}></Route>
          <Route path="/sign-up" component={Signup}></Route>
        </Switch>
      </Router>
  );
}

export default App;
