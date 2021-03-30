import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Finances</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className='fas fa-keyboard'></i> Purchase Entry
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/purchases'>
                <Nav.Link>
                  <i className='fas fa-list'></i> Purchase List
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/accounts'>
                <Nav.Link>
                  <i className='fas fa-money-check-alt'></i> Account Updates
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/dashboard'>
                <Nav.Link href='/dashboard'>
                  <i className='fas fa-tachometer-alt'></i> Dashboard
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/moods'>
                <Nav.Link>
                  <i className='fas fa-cloud-moon'></i> Mood Tracker
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
