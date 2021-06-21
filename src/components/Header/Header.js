import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import '../../assets/scss/header.scss';
import avatar from '../../assets/images/avatar.jpg';

import { signOut } from '../../actions/auth';

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [roleName, setRoleName] = useState();

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
    const me = useSelector(state => state.userReducer.me);

    const handleLogout = e => {
        e.preventDefault();

        dispatch(signOut())
            .then(() => {
                history.push('/');
            });
    }

    useEffect(() => {
        if (me) {
            switch (me.role.name) {
                case process.env.ROLE_ADMIN:
                    setRoleName('Admin');
                break;
                case process.env.ROLE_TEACHER:
                    setRoleName('Teacher');
                break;
                case process.env.ROLE_STUDENT:
                    setRoleName('Student');
                break;
                default: break;
            }
        }
    }, [me]);

    return (
        <header className="header">
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
                                <span className="user-details-role">{roleName}</span>
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/profile">
                                <AccountCircleIcon />
                                <span className="name">My profile</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="/logout" onClick={handleLogout}>
                                <ExitToAppIcon />
                                <span className="name">Logout</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> :
                    <div className="header-tools-unlogged">
                        <a href="/sign-in" className="header-tools-unlogged-signin w-20 btn">Sign in</a>
                    </div>
            }
            </div>
        </header>
    );
}
