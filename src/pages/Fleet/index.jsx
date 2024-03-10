import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet-async";

import carData from "../../assets/data/carData";
import CarItem from "../../components/UI/CarItem";

const Fleet = () => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Fleet </title>
      </Helmet>
      <Container className="my-5">
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h6 className="section__subtitle">Choose from our</h6>
            <h2 className="section__title">Wide Range</h2>
          </Col>
          {carData.slice(0, 6).map((item) => (
            <CarItem item={item} key={item.id} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Fleet;
