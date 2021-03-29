import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar
        bg='primary'
        variant='dark'
        expand='lg'
        fixed='top'
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href='#home'>Finances</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/'>
                <i className='fas fa-keyboard'></i> Purchase Entry
              </Nav.Link>
              <Nav.Link href='/purchases'>
                <i className='fas fa-list'></i> Purchase List
              </Nav.Link>
              <Nav.Link href='/accounts'>
                <i className='fas fa-money-check-alt'></i> Account Updates
              </Nav.Link>
              <Nav.Link href='/dashboard'>
                <i className='fas fa-tachometer-alt'></i> Dashboard
              </Nav.Link>
              <Nav.Link href='/moods'>
                <i className='fas fa-cloud-moon'></i> Mood Tracker
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
