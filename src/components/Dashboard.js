import React from 'react';
import { Container } from 'react-bootstrap';
import map from 'lodash/map';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

import '../assets/scss/dashboard.scss';

export default function Dashboard() {

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
        <>
            <nav className='navbar-left'>
                <ul className='nav-menu-items'>
                    {
                        map(navbarItems(), item => {
                            return (
                                <li className={item.cName}>
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
            <div className="page-content">
                <Container className="d-flex justify-content-center dashboard">
                </Container>
            </div>
            <div className="navbar-right">

            </div>
        </>
    );
}