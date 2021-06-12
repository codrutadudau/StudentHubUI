import React from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

import Header from './Header/Header';
import '../assets/scss/sidebar.scss';

const Layout = ({ component: Component }) => {

    const navbarItems = () => {
        return ([
            {
                title: 'Home',
                path: '/dashboard',
                icon: <HomeIcon />,
                cName: 'navbar-menu-items-item'
            },
            {
                title: 'Users',
                path: '/users',
                icon: <PeopleIcon />,
                cName: 'navbar-menu-items-item'
            },
            {
                title: 'Quizzes',
                path: '/quizzes',
                icon: <FormatListBulletedIcon />,
                cName: 'navbar-menu-items-item'
            },
            {
                title: 'Questions',
                path: '/questions',
                icon: <QuestionAnswerIcon />,
                cName: 'navbar-menu-items-item'
            },
        ]);
    }

    return (
        <div className="layout">
            <Header />
            <div className="layout-body">
                <section className="layout-content">
                    <Component />
                </section>
                <div className="layout-left-sidebar sidebar">
                    <nav className='navbar-menu'>
                        <ul className='navbar-menu-items'>
                            {
                                map(navbarItems(), (item, index) => {
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </nav>
                </div>
                <div className="layout-right-sidebar sidebar">
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
