import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/about-img.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "200px" }
      }
    >
      <Container>
        <Row>
          <Col lg="7" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to car rent service</h2>
              <p className="section__description" style={{ fontWeight: 500 }}>
                Welcome to Just Rent-A-Car. When you need a convenient, friendly
                car rental service, our company is here to make your stay more
                pleasant. Our great service includes complimentary pick up and
                drop off, and we are located near the airport so you can be on
                your way without delay. We honor Veteran and senior citizen
                discounts. Additionally, we apply discounts for rentals that’s
                six days and more. Our professionally detailed cars are safe,
                comfortable way to get around town. Whether you want a compact
                or mid-size car, SUV, minivan, or jeep, we offer free unlimited
                mileage on all our automatic, air-conditioned vehicles. Our
                efficient check-in and checkout services guarantee that you’ll
                lose no time procuring and returning your rental car. Always
                buckle up and keep your speed to less than 35 mph. Most
                importantly, enjoy your stay in sunny St. Thomas and remember,
                in St. Thomas, left is right and right is wrong. We drive on the
                side where you can pick the bush :
              </p>
            </div>
          </Col>

          <Col lg="5" md="5">
            <div className="about__img">
              <img
                src={aboutImg}
                alt=""
                className="w-100"
                style={{ marginTop: "80px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
