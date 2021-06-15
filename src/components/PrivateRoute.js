import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import AdminSidebar from './Sidebar/AdminSidebar';
import TeacherSidebar from './Sidebar/TeacherSidebar';
import StudentSidebar from './Sidebar/StudentSidebar';

const PrivateRoute = ({ component: Component, role: role, ...rest }) => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    const getSidebarByRole = (role) => {
        switch (role) {
            case process.env.ROLE_ADMIN:
                return AdminSidebar;
            case process.env.ROLE_TEACHER:
                return TeacherSidebar;
            case process.env.ROLE_STUDENT:
                return StudentSidebar;
            default: break;
        }
    }

    return (
        <Route
            {...rest}
            render={
                props => (
                    isLoggedIn ?
                        <Layout component={() => <Component role={role} />} sidebar={getSidebarByRole(role)} />:
                        <Redirect to="/sign-in" />
                )
            }
        />
    );
};

export default PrivateRoute;
