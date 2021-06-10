import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    return (
        <Route
            {...rest}
            render={
                props => (
                    isLoggedIn ?
                        <Layout component={Component} />:
                        <Redirect to="/sign-in" />
                )
            }
        />
    );
};

export default PrivateRoute;
