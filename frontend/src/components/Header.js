import React from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import googleSignInButton from '../images/googleSignInWhiteLarge.png'

const Header = () => {
  const auth = useSelector((state) => state.auth)

  const renderAuthButton = () => {
    switch (auth) {
      case null:
        return
      case false:
        return (
          <Navbar.Brand href='/auth/google'>
            <img
              alt='Google Sign In Button'
              src={googleSignInButton}
              height='46px'
              className='d-inline-block align-bottom'
            />
          </Navbar.Brand>
        )
      default:
        return (
          <Nav.Link href='/auth/logout'>
            <i className='fab fa-google'></i> Log Out
          </Nav.Link>
        )
    }
  }

  return (
    <header style={{ marginBottom: '55px' }}>
      <Navbar
        bg='primary'
        variant='dark'
        expand='lg'
        collapseOnSelect
        fixed='top'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Finances</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/'>
                <Nav.Link className='my-auto'>
                  <i className='fas fa-keyboard'></i> Purchase Entry
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/purchases'>
                <Nav.Link className='my-auto'>
                  <i className='fas fa-list'></i> Purchases
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/accounts'>
                <Nav.Link className='my-auto'>
                  <i className='fas fa-money-check-alt'></i> Accounts
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/dashboard'>
                <Nav.Link className='my-auto'>
                  <i className='fas fa-tachometer-alt'></i> Dashboard
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/moods'>
                <Nav.Link className='my-auto'>
                  <i className='fas fa-cloud-moon'></i> Moods
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/widgets'>
                <Nav.Link className='my-auto'>
                  <i className='fas fa-calculator'></i> Widgets
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/settings'>
                <Nav.Link className='my-auto'>
                  <i className='fas fa-cogs'></i> Settings
                </Nav.Link>
              </LinkContainer>
              {renderAuthButton()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
