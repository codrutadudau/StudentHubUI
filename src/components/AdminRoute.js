import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

const AdminRoute = ({ component: Component, layout: Layout, ...rest }) => {
    let roleName = "";
    if (sessionStorage.getItem("token")) {
        roleName = jwt_decode(sessionStorage.getItem("token")).role;
    }

    return (
        <Route
            {...rest}
            render={
                props => (
                    roleName !== process.env.ROLE_ADMIN ?
                        <Redirect to="/" /> :
                        <Layout component={Component} />
                )
            }
        />
    );
};

export default AdminRoute;
