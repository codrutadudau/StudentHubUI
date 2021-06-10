import React from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

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
            <nav className='navbar-left'>
                <ul className='nav-menu-items'>
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
            <div className="page-content">
                <Component />
            </div>
            <div className="navbar-right">

            </div>
        </div>
    )
}

export default Layout;
