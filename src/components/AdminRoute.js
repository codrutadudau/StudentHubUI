import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminSidebar from './Sidebar/AdminSidebar';
import Layout from './Layout';

const AdminRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    return (
        <Route
            {...rest}
            render={
                props => (
                    isLoggedIn ?
                        <Layout component={Component} sidebar={AdminSidebar} /> :
                        <Redirect to="/" />
                )
            }
        />
    );
};

export default AdminRoute;
