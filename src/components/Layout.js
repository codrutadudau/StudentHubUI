import React from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

import Header from './Header/Header';

const Layout = ({ component: Component, ...rest }) => {

    const navbarItems = () => {
        return ([
            {
                title: 'Home',
                path: '/dashboard',
                icon: <HomeIcon />,
                cName: 'nav-text'
            },
            {
                title: 'Users',
                path: '/users',
                icon: <PeopleIcon />,
                cName: 'nav-text'
            },
            {
                title: 'Quizzes',
                path: '/quizzes',
                icon: <FormatListBulletedIcon />,
                cName: 'nav-text'
            },
            {
                title: 'Questions',
                path: '/questions',
                icon: <QuestionAnswerIcon />,
                cName: 'nav-text'
            },
        ]);
    }

    return (
        <div className="layout">
            <Header />
            <div class="layout-body">
                <section class="layout-content">
                    <Component />
                </section>
                <div class="layout-left-sidebar sidebar">
                    5555555555555
                </div>
                <div class="layout-right-sidebar sidebar">
                    44444444444
                </div>
            </div>
            <footer>
               123123
            </footer>
        </div>
    )
}

export default Layout;
