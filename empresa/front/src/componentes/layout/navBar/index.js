import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../../img/logo.jpg'

import {Routes, Route, Link} from 'react-router-dom'
import './style.css'


function NavBar()  {
  return (
    <>
  
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className='link'>UP</Link>
            <Link className='link'>Home</Link>
            <Link className='link'>Quem Somos</Link>
            <Link className='link' >fale conosco</Link>
          </Nav>
        </Container>
      </Navbar>
    <br/>


    </>
  );
}

export default NavBar;