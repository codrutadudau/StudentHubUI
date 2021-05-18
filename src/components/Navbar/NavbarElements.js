import styled from 'styled-components';
import {Link as LinkR} from 'react-router-dom';

export const Nav = styled.nav`
    background: #000000; 
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px){
        transition : 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
`

export const NavLogo = styled.div`
    color: #fff;
    justify-self: flex-start;
    font-size: 24px;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`

export const NavButton = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        display: none;
    }
`

export const NavBtnLink= styled(LinkR)`
    border-radius: 50px;
    background: rgb(105,187,123);
    white-space: nowrap;
    padding: 6px 18px;
    color: #010606;
    font-size: 16px;
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