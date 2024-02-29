import React from "react";
import { TileLayer , MapContainer, Marker, Popup } from "react-leaflet";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logo from '../../assets/all-images/LogoM.jpg';

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "#",
    display: "Privacy Policy",
  },

  {
    path: "#",
    display: "Terms of Use",
  },

  {
    path: "/fleet",
    display: "Fleet",
  },
  
  {
    path: "/faq",
    display: "FAQ",
  },

  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <span>
                    <img className="logo" src={logo} alt="logo" />
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, distinctio, itaque reiciendis ab cupiditate harum ex
              quam veniam, omnis expedita animi quibusdam obcaecati mollitia?
              Delectus et ad illo recusandae temporibus?
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">69A Bournefield St. Thomas, Virgin Islands 00802 USA</p>
              <p className="office__info">Phone:  (340) 776-3730</p>

              <p className="office__info">Email: Firstrent@earthlink.net</p>

              <p className="office__info">Office Time: 10am - 7pm</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer-title">Location</h5>
              <div className="map-wrap">
                <MapContainer center={[18.336000, -64.917503]} zoom={15} scrollWheelZoom={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                  <Marker position={[18.336000, -64.917503]}>
                    <Popup>Find us here</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>Copyright {year}, Developed by
                <Link to="https://www.linkedin.com/in/biswadeep-mukhopadhyay" className="design_link">Biswadeep Mukhopadhyay</Link>. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer