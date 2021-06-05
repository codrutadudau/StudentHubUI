import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import '../scss/header.scss';
import avatar from '../assets/images/avatar.jpg';

import { signOut } from '../actions/auth';

export default function Header() {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const me = useSelector(state => state.userReducer.me);

    const handleLogout = e => {
        e.preventDefault();

        dispatch(signOut());
    }

    return (
        <nav className="header">
            <div className="header-container">
                <a className="header-logo" href="/">StudentHub</a>
                <div className="header-tools">
                {
                    isLoggedIn && me ?
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <span className="avatar">
                                    <img src={avatar} alt="user-avatar"/>
                                </span>
                                <span className="user-details">
                                    <span className="user-details-name">{me.firstName}</span>
                                    <span className="user-details-role">{me.role.name}</span>
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                    <FontAwesomeIcon icon={faUserCircle} />
                                    <span className="name">My account</span>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                    <FontAwesomeIcon icon={faCog} />
                                    <span className="name">Settings</span>
                                </Dropdown.Item>
                                <Dropdown.Item href="/logout" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span className="name">Logout</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> :
                        <a href="/sign-in" className="header-tools-signin w-20 btn">Sign in</a>
                }
                </div>
            </div>
        </nav>
    );
}
