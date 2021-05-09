import React from 'react'
import {Nav, NavbarContainer, NavLogo, NavButton, NavBtnLink} from './NavbarElements';

const Navbar = () => {
    return (
       <Nav>
           <NavbarContainer>
               <NavLogo>StudentHub</NavLogo>
            <NavButton>
                <NavBtnLink to = 'signin'>Sign in</NavBtnLink>
                <NavBtnLink to = 'signup'>Sign up</NavBtnLink>
            </NavButton>
           </NavbarContainer>
        </Nav>
    )
}

export default Navbar;
