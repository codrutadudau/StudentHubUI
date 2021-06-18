import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import '../../assets/scss/sidebar.scss';

export default function TeacherSidebar() {
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
                title: 'Courses',
                path: '/courses',
                icon: <FolderOpenIcon className="navbar-menu-items-item-icon" />,
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
        <div className="layout-left-sidebar sidebar teacher-sidebar">
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
