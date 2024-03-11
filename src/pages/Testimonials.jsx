import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet-async";

import Testimonial from "../components/UI/Testimonial";

const Testimonials = () => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Testimonials </title>
      </Helmet>
      <Container className="my-5">
        <Row>
          <Col lg="12" className="mb-4 text-center">
            <h6 className="section__subtitle">Our clients says</h6>
            <h2 className="section__title">Testimonials</h2>
          </Col>
          <Testimonial />
        </Row>
      </Container>
    </>
  );
};

export default Testimonials;
