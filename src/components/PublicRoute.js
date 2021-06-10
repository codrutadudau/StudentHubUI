import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, layout: Layout, restricted, ...rest }) => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    return (
        <Route
            {...rest}
            render={
                props => (
                    isLoggedIn && restricted ?
                        <Redirect to="/dashboard" /> :
                        <Layout component={Component} />
                )
            }
        />
    );
};

export default PublicRoute;
