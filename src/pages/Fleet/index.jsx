import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "reactstrap";
import CarSection from "../../components/UI/CarSection";

const Fleet = () => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Fleet </title>
      </Helmet>
      <Container>
        <CarSection />
      </Container>
    </>
  );
};

export default Fleet;
