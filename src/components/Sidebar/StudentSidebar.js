import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import HomeIcon from '@material-ui/icons/Home';

import '../../assets/scss/sidebar.scss';

export default function StudentSidebar() {
    const history = useHistory();
    const [selectedItem, setSelectedItem] = useState({
        active: ""
    });

    const navbarItems = () => {
        return ([
            {
                title: 'Dashboard',
                path: '/dashboard',
                icon: <HomeIcon className="navbar-menu-items-item-icon" />,
                cName: 'navbar-menu-items-item'
            },
            {
                title: 'Classroom',
                path: '/classroom',
                icon: <PeopleOutlineIcon className="navbar-menu-items-item-icon" />,
                cName: 'navbar-menu-items-item'
            },
            {
                title: 'Quizzes',
                path: '/quizzes',
                icon: <PeopleOutlineIcon className="navbar-menu-items-item-icon" />,
                cName: 'navbar-menu-items-item'
            },
        ]);
    }

    const handleClick = (e, index) => {

        setSelectedItem({
            active: index,
        });
    }

    return (
        <div className="layout-left-sidebar sidebar student-sidebar">
            <nav className='navbar-menu'>
                <ul className='navbar-menu-items'>
                    {
                        map(navbarItems(), (item, index) => {
                            const activeClassName = selectedItem.active === index || history.location.pathname === item.path ? 'active' : '';
                            
                            return (
                                <li key={index} className={`${item.cName} ${activeClassName}`} >
                                    <Link to={item.path} onClick={e => handleClick(e, index)} className={activeClassName}>
                                        {item.icon}
                                        <span className={`${item.cName}-text`}>{item.title}</span>
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
