import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import axios from 'axios';
import map from 'lodash/map';

import '../assets/scss/style.scss';

import HomePage from './HomePage';
import Login from './Auth/Signin';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import Signup from './Auth/Signup';
import { adminRoutes } from '../routes/adminRoutes';


function App() {
    axios.interceptors.request.use(function (config) {
        const token = sessionStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    });

    return (
        <Router>
            <Switch>
                <PublicRoute path="/" exact component={HomePage} restricted={true} />
                <PublicRoute path="/sign-in" component={Login} restricted={true} />
                <PublicRoute path="/sign-up" component={Signup} restricted={true} />
                {
                    map(adminRoutes, (route, index) => {
                        return (
                            <AdminRoute key={index} {...route} />
                        );
                    })
                }
            </Switch>
        </Router>
    );
}

export default App;
