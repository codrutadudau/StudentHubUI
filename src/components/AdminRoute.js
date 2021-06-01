import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

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
                    roleName !== process.env.ROLE_ADMIN ?
                        <Redirect to="/" /> :
                        <Component {...props} />
                )
            }
        />
    );
};

export default AdminRoute;
