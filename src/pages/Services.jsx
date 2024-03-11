import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet-async";

import ServicesList from "../components/UI/ServicesList";

const Services = () => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Services </title>
      </Helmet>
      <Container className="my-5">
        <Row>
          <Col lg="12" className="mb-5 text-center">
            <h6 className="section__subtitle">See our</h6>
            <h2 className="section__title">Popular Services</h2>
          </Col>
          <ServicesList />
        </Row>
      </Container>
    </>
  );
};

export default Services;
