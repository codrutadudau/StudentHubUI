import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom';

export const HeroContainer = styled.div`
    background: #0c0c0c;
    display: flex;
    justify-content: center;
    align:center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index:1;
`

export const HeroBackground = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const HeroVideo = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`

export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 128px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeroTitle = styled.h1`
    color: #fff;
    font-size: 48px;
    text-align: center;
`

export const HeroP = styled.p`
    margin-top: 28px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    max-width: 600px;
`

export const HeroButton = styled.nav`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;


    @media screen and (max-width: 768px){
        display: none;
    }
`

export const HeroBtnLink= styled(LinkR)`
    border-radius: 50px;
    background: rgb(105,187,123);	;
    white-space: nowrap;
    padding: 6px 18px;
    color: #010606;
    font-size: 18px;
    outline:none;
    margin: 9px;
    border:none;
    transition: all 0.2s ease-in-out;
    text-decoration:none; 

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`
