import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header';
import Video from '../videos/video.mp4';
import '../assets/scss/homepage.scss';

export default function PageNotFound() {
    const className = 'homepage-container';

    return (
        <>
            <Header />
            <div className={`${className}`}>
            <div className={`${className}-background`}>
                <video className={`${className}-video`} autoPlay loop muted src={Video}/>
            </div>
            <div className={`${className}-content`}>
                <h1 className={`${className}-title`}>The page was not found</h1>
            </div>
        </div>
        </>
    );
}
