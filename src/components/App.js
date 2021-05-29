import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../scss/style.scss';
import Dashboard from './Dashboard';
import Header from './Header';
import HomePage from './HomePage';
import Login from './Signin';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from './Signup';

function App() {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    return (
        <Router>
            <Header />
            <Switch>
                <PublicRoute path="/" exact component={HomePage} restricted={true} />
                <PublicRoute path="/sign-in" component={Login} restricted={true} />
                <PublicRoute path="/sign-up" component={Signup} restricted={true} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
            </Switch>
        </Router>
    );
}

export default App;
