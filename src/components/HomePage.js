import React from 'react';
import { Link } from 'react-router-dom';
import Video from '../videos/video.mp4';
import '../assets/scss/homepage.scss';

export default function HomePage() {
    const className = 'homepage-container';

    return (
        <div className={`${className}`}>
            <div className={`${className}-background`}>
                <video className={`${className}-video`} autoPlay loop muted src={Video}/>
            </div>
            <div className={`${className}-content`}>
                <h1 className={`${className}-title`}>Welcome to StudentHub</h1>
                <p className={`${className}-subtitle`}>This platform is created for the students currently enrolled at the Faculty of Computer Science, Iasi</p>
                <p className={`${className}-subtitle`}><Link className={`${className}-subtitle-link btn`} to="/sign-up">Sign up</Link> to receive more information</p>
            </div>
        </div>
    );
}
