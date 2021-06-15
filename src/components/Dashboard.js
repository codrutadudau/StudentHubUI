import React from 'react';

import AdminDashboard from './Admin/Dashboard';
import TeacherDashboard from './Teacher/Dashboard';
import StudentDashboard from './Student/Dashboard';

import '../assets/scss/dashboard.scss';

export default function Dashboard(props) {

    const getDashboardByRole = (role) => {
        switch (role) {
            case process.env.ROLE_ADMIN:
                return <AdminDashboard />;
            case process.env.ROLE_TEACHER:
                return <TeacherDashboard />;
            case process.env.ROLE_STUDENT:
                return <StudentDashboard />;
            default: break;
        }
    }

    return (getDashboardByRole(props.role));
}
