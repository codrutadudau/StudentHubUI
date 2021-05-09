import React from 'react'
import Video from '../../videos/video.mp4'
import {HeroContainer, HeroBackground, HeroVideo} from './HeroElements'

function HeroSection() {
    return (
        <HeroContainer>
            <HeroBackground>
                <HeroVideo autoPlay loop muted src = {Video} type = 'video/mp4'/>
            </HeroBackground>
            {/* <HeroContent>
                <HeroTitle>Welcome to StudentHub</HeroTitle>
                <HeroP>This platform is created only for the students currently enrolled in the 1st/2nd or 3rd year  
                </HeroP>
            </HeroContent> */}
        </HeroContainer>
            
    )
}

export default HeroSection
