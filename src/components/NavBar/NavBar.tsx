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
    localStorage.setItem('i18nextLng', lng); // Сохраняем язык в localStorage
  }


 


  return <Navbar collapseOnSelect className={style.bg}>
    <Container className={style.nav}>
      <Nav.Link style={{color: "white", fontWeight: "bold", marginRight: 40}} as={Link} to="/">{t("Logo")}</Nav.Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">{t("Home")}</Nav.Link>
          <Nav.Link as={Link} to="/products">{t("All products")}</Nav.Link>
          <Nav.Link as={Link} to="/about">{t("About us")}</Nav.Link>
          <NavDropdown className={style.dropdown} title={t("Brands")}>
            <NavDropdown.Item className={style.item} href="/apple">{t("Apple")}</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/xiaomi">{t("Xiaomi")}</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/samsung">{t("Samsung")}</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/honor">{t("Honor")}</NavDropdown.Item>
            <NavDropdown.Item className={style.item} href="/huawei">{t("Huawei")}</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!!isAuth ?
            <>
              <Nav.Link style={{color: "white"}} as={Link} to="/cart">
                {t("Cart")}
                <Badge className="bg-secondary">{cartCount}</Badge>
              </Nav.Link>
              <Nav.Link style={{color: "white"}} as={Link} to="/amount">
                {t("Balance")}
                <Badge className="bg-secondary">{new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(isAuth.amount)}</Badge>
              </Nav.Link>
              <Col xs={6} md={4}>
                <Image className={style.avatar} src={isAuth.avatar} roundedCircle />
              </Col>
            </> : <Nav.Link style={{color: "white"}} as={Link} to="/login">{t("Log In")}</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Container>
    <div className={style.lng}>
      <button onClick={() => changeLanguage('en')}>en</button>
      <button onClick={() => changeLanguage('ru')}>ru</button>
    </div>
    
  </Navbar>
}

export default NavBar;