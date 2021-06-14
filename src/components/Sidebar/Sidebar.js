import React from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

import '../../assets/scss/sidebar.scss';

export default function Sidebar() {

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
    )
}
