import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from "./NavBar.module.scss"
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { Badge, Col, Image } from 'react-bootstrap';
import { useState } from 'react';


const NavBar = () => {

  const isAuth = useAppSelector((state) => {
    if (state.user.auth) {
      return state.user.auth
    }
    return null
  })

  const cartCount = useAppSelector((state) => {
    if (state.cart.cartUser) {
      return state.cart.cartUser.length
    }
    return 0
  })



  return <Navbar collapseOnSelect className={style.bg}>
    <Container className={style.nav}>
      <Nav.Link as={Link} to="/">
        <Navbar.Brand >Pribylskiy-shop</Navbar.Brand>
      </Nav.Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/products">All products</Nav.Link>
          <Nav.Link as={Link} to="/about">About us</Nav.Link>
          <NavDropdown title="Category" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/smartphones">Smartphones</NavDropdown.Item>
            <NavDropdown.Item href="/laptops">Laptops</NavDropdown.Item>
            <NavDropdown.Item href="/tablets">Tablets</NavDropdown.Item>
            <NavDropdown.Item href="/mens-watches">Mens-watches</NavDropdown.Item>
            <NavDropdown.Item href="/accessories">Accessories</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!!isAuth ?
            <>
              <Nav.Link as={Link} to="/cart">
                Cart
                <Badge className="bg-secondary">{cartCount}</Badge>
              </Nav.Link>
              <Nav.Link as={Link} to="/amount">
                Amount
                <Badge className="bg-secondary">{new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(isAuth.amount)}</Badge>
              </Nav.Link>
              <Col xs={6} md={4}>
                <Image className={style.avatar} src={isAuth.avatar} roundedCircle />
              </Col>
            </> : <Nav.Link as={Link} to="/login">Log In</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default NavBar;