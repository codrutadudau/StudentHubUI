import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import Layout from './Layout';
import AdminSidebar from './Sidebar/AdminSidebar';

const AdminRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    let roleName = "";
    if (sessionStorage.getItem("token")) {
        roleName = jwt_decode(sessionStorage.getItem("token")).role;
    }

    return (
        <Route
            {...rest}
            render={
                props => (
                    roleName === process.env.ROLE_ADMIN && isLoggedIn ?
                        <Layout component={Component} sidebar={AdminSidebar} /> :
                        <Redirect to="/" />
                )
            }
        />
    );
};

export default AdminRoute;
