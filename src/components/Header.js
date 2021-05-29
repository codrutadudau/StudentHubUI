import React from 'react';
import '../scss/header.scss';

export default function Header() {
    return (
        <nav className="header">
            <div className="header-container">
                <a className="header-logo" href="/">StudentHub</a>
                <div className="header-tools">
                    <a href="/sign-in" className="header-tools-signin w-20 btn">Sign in</a>
                </div>
            </div>
        </nav>
    );
}
