import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import map from 'lodash/map';

import '../assets/scss/style.scss';

import Dashboard from './Dashboard';
import HomePage from './HomePage';
import Login from './Auth/Signin';
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from './Auth/Signup';

import { adminRoutes } from '../routes/adminRoutes';
import { studentRoutes } from '../routes/studentRoutes';
import { teacherRoutes } from '../routes/teacherRoutes';

function App() {
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    });

    const token = useSelector(state => state.authReducer.token);
    let roleName = "";
    if (token) {
        roleName = jwt_decode(token).role;
    }

    return (
        <Router>
            <Switch>
                <PublicRoute path="/" exact component={HomePage} restricted={true} />
                <PublicRoute path="/sign-in" component={Login} restricted={true} />
                <PublicRoute path="/sign-up" component={Signup} restricted={true} />
                <PrivateRoute path="/dashboard" component={Dashboard} role={roleName} />
                {
                    roleName === process.env.ROLE_ADMIN &&
                    map(adminRoutes, (route, index) => {
                        return (
                            <PrivateRoute key={index} role={roleName} {...route} />
                        )
                    })
                }
                {
                    roleName === process.env.ROLE_TEACHER &&
                    map(teacherRoutes, (route, index) => {
                        return (
                            <PrivateRoute key={index} role={roleName} {...route} />
                        )
                    })
                }
                {
                    roleName === process.env.ROLE_STUDENT &&
                    map(studentRoutes, (route, index) => {
                        return (
                            <PrivateRoute key={index} role={roleName} {...route} />
                        )
                    })
                }
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    );
}

export default App;
