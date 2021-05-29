import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../scss/header.scss';

import { signOut } from '../actions/auth';

export default function Header() {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

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
                    isLoggedIn ?
                        <a href="/logout" onClick={handleLogout} className="header-tools-signin w-20 btn">Log out</a> :
                        <a href="/sign-in" className="header-tools-signin w-20 btn">Sign in</a>
                }
                </div>
            </div>
        </nav>
    );
}
