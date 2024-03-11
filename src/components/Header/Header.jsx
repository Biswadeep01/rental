import React, { useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import logo from "../../assets/all-images/LogoM.jpg";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/fleet",
    display: "Fleet",
  },

  {
    path: "/blog",
    display: "Blog",
  },

  {
    path: "/services",
    display: "Services",
  },

  {
    path: "/testimonials",
    display: "Testimonials",
  },

  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <Link to="/" className=" d-flex align-items-center gap-2">
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </Col>

            <Col lg="4" md="3" sm="4">
              <div className="header__location d-flex justify-content-center align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4 style={{ textAlign: "center" }}>St. Thomas,</h4>
                  <h6>Virgin Islands, U.S.A.</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="4"
              md="3"
              sm="0"
              className="d-flex align-items-center justify-content-end"
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div
        className="main__navbar"
        style={{ boxShadow: "5px 5px 5px #000000" }}
      >
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
            <Link
              to="/auth"
              className=" d-flex align-items-center gap-2"
              style={{ color: "white", textDecoration: "none" }}
            >
              <i class="ri-login-circle-line"></i> Login
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
