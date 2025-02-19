import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { Badge, Col, Image } from 'react-bootstrap';
import style from "./NavBar.module.scss"
import { useTranslation } from 'react-i18next';


const NavBar = () => {
  const {t, i18n} = useTranslation()

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }


 


  return <Navbar collapseOnSelect className={style.bg}>
    <Container className={style.nav}>
      <Nav.Link style={{color: "white", fontWeight: "bold", marginRight: 40}} as={Link} to="/">Pribylskiy-shop</Nav.Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">{t("Home")}</Nav.Link>
          <Nav.Link as={Link} to="/products">All products</Nav.Link>
          <Nav.Link as={Link} to="/about">About us</Nav.Link>
          <NavDropdown className={style.dropdown} title="Brands">
            <NavDropdown.Item className={style.item} href="/apple">Apple</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/xiaomi">Xiaomi</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/samsung">Samsung</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/honor">Honor</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/huawei">Huawei</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!!isAuth ?
            <>
              <Nav.Link style={{color: "white"}} as={Link} to="/cart">
                Cart
                <Badge className="bg-secondary">{cartCount}</Badge>
              </Nav.Link>
              <Nav.Link style={{color: "white"}} as={Link} to="/amount">
                Amount
                <Badge className="bg-secondary">{new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(isAuth.amount)}</Badge>
              </Nav.Link>
              <Col xs={6} md={4}>
                <Image className={style.avatar} src={isAuth.avatar} roundedCircle />
              </Col>
            </> : <Nav.Link style={{color: "white"}} as={Link} to="/login">Log In</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Container>
    <button onClick={() => changeLanguage('en')}>English</button>
    <button onClick={() => changeLanguage('ru')}>Русский</button>
    
  </Navbar>
}

export default NavBar;