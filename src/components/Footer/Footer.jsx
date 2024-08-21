import React from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logo from "../../assets/all-images/LogoM.jpg";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/privacy",
    display: "Privacy Policy",
  },
  {
    path: "/terms",
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
                    <img className="logo-f footer_logo_bg" src={logo} alt="logo" />
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            Just Rent-A-Car. When you need a convenient, friendly car rental service, our company is here to make your stay more pleasant. 
            Our great service includes free pick up and drop off, and we are located near the airport so you can be on your way without delay. 
            We honor Veteran and seniour citizen discounts. Additionally, we apply discounts to rentals that last five days and more. 
            Our professionally detailed cars are the safe, comfortable way to get around town.
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
              <p className="office__info">
                69A Bournefield St. Thomas, US Virgin Islands 00802
              </p>
              <p className="office__info">
                Mailing address: P.O. Box 302476 St. Thomas, US Virgin Islands
                00803
              </p>
              <p className="office__info">Phone: 340-208-0828</p>
              <p className="office__info">Email: Info@just-rentacar.com</p>
              <p className="office__info">Reservation@just-rentacar.com</p>
              <p className="office__info">Office Time: 09 A.M. - 05 P.M.</p>
              <p className="office__info">Reservation Time: 08 A.M. - 06 P.M.</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer-title">Location</h5>
              <div className="map-wrap">
                <MapContainer
                  center={[18.336, -64.917503]}
                  zoom={15}
                  scrollWheelZoom={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[18.336, -64.917503]}>
                    <Popup>Just Rent a Car</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                <i class="ri-copyright-line"></i>&nbsp;Just Rent-A-Car, {year} ||
                Developed by
                <Link to="https://blueonnix.com/" className="design_link" target="_blank">
                  &nbsp; BlueOnNix
                </Link>
              </p>
              <p style={{ textAlign: "center" }}>All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
