import React from 'react'
import Video from '../../videos/video.mp4'
import {HeroContainer, HeroBackground, HeroVideo, HeroContent, HeroTitle, HeroP, HeroButton, HeroBtnLink} from './HeroElements'

function HeroSection() {
    return (
        <HeroContainer>
            <HeroBackground>
                <HeroVideo autoPlay loop muted src = {Video} type = 'video/mp4'/>
            </HeroBackground>
            <HeroContent>
                <HeroTitle>Welcome to StudentHub</HeroTitle>
                <HeroP>This platform is created for the students currently enrolled at the Faculty of Computer Science, Iasi</HeroP>
                <HeroP>Sign up to receive more information</HeroP>
                <HeroButton>
                    <HeroBtnLink to = 'signup'>Sign up</HeroBtnLink>
                </HeroButton>
            </HeroContent>
          
        </HeroContainer>
            
    )
}

export default HeroSection
