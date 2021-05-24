import React from 'react';
import '../scss/header.scss';

function handleOnClick() {
    window.location.href = '/';
}

export default function Header() {
    return (
        <nav className="header">
            <div className="header-container" onClick={handleOnClick}>
                <div className="header-logo">StudentHub</div>
            </div>
        </nav>
    );
}
