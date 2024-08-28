import React, { useState, useEffect } from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logo from "../../assets/all-images/LogoM.jpg";
import { apiGetFooterInfo } from "../../firebase/firestore/queries";
import isEmpty from "lodash.isempty";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const [description, setDescription] = useState("");
  const [quickLinks, setQuickLinks] = useState([]);
  const [address, setAddress] = useState([]);

  const handleGetDescription = async () => {
    const footerDescription = await apiGetFooterInfo("information");
    if (footerDescription) {
      setDescription(footerDescription.description);
    }
    const footerQuickLinks = await apiGetFooterInfo("quickLinks");
    if (footerQuickLinks) {
      setQuickLinks(footerQuickLinks.quickLinks);
    }
    const addressDetails = await apiGetFooterInfo("address");
    if (addressDetails) {
      setAddress(addressDetails.addressDetails);
    }
  };

  useEffect(() => {
    handleGetDescription();
  }, []);

  return (
    <footer className="footer">
      <Container>
        <Row>
          {description && (
            <Col lg="4" md="4" sm="12">
              <div className="logo footer__logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <span>
                      <img
                        className="logo-f footer_logo_bg"
                        src={logo}
                        alt="logo"
                      />
                    </span>
                  </Link>
                </h1>
              </div>
              <p className="footer__logo-content">{description}</p>
            </Col>
          )}

          {!isEmpty(quickLinks) && (
            <Col lg="2" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title">Quick Links</h5>
                <ListGroup>
                  {quickLinks.map((item, index) => (
                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                      <Link to={item.link}>{item.label}</Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </Col>
          )}

          {!isEmpty(address) && (
            <Col lg="3" md="4" sm="6">
              <div className="mb-4">
                <h5 className="footer__link-title mb-4">Head Office</h5>

                {address.map((a) => (
                  <p className="office__info">
                    {a.label && <>{a.label}: </>} {a.value}
                  </p>
                ))}
              </div>
            </Col>
          )}

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer-title">Location</h5>
              <div className="map-wrap">
                <MapContainer
                  center={[18.336, -64.917503]}
                  zoom={15}
                  scrollWheelZoom={false}
                >
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
                <i class="ri-copyright-line"></i>&nbsp;Just Rent-A-Car, {year}{" "}
                || Developed by
                <Link
                  to="https://blueonnix.com/"
                  className="design_link"
                  target="_blank"
                >
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
