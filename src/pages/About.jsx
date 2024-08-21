import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet-async";

import "../styles/about-section.css";
import aboutImg from "../assets/all-images/cars-img/about-img.png";
import OurMembers from "../components/UI/OurMembers";

const About = () => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | About </title>
      </Helmet>
      <Container className="my-5">
        <Row>
          <Col lg="7" md="7">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to car rent service</h2>
              <p className="section__description">
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
              <br />
              <h4 className="section__subtitle">Why Choose us?</h4>
              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i>We offer complimentary
                pick-up and drop off service
              </p>

              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i>Discounts with rentals of
                6 days or more
              </p>

              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i>Convenient business hours
              </p>

              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i>Efficient check-in and
                checkout
              </p>

              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i>Professionally detailed
                cars
              </p>

              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i> All cars are automatic
                with air conditioning
              </p>

              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i> Free unlimited mileage,
                compact, mid-size, SUV’s, mini vans, and jeeps
              </p>

              <p className="section__description d-flex align-items-center gap-2">
                <i class="ri-checkbox-circle-line"></i> Visa, MasterCard,
                Discover and American Express accepted
              </p>
            </div>
          </Col>
          <Col lg="5" md="5">
            <div className="about__img">
              <img
                src={aboutImg}
                alt=""
                className="w-100"
                style={{ marginTop: "50px" }}
              />
            </div>
          </Col>
        </Row>
        <Col lg="12" md="12" className="text-center mb-5">
          <h1
            className="section__subtitle member"
            style={{ textAlign: "center" }}
          >
            Our Members
          </h1>
          <OurMembers />
        </Col>
      </Container>
    </>
  );
};

export default About;
