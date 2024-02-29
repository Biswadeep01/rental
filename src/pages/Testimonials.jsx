import React from 'react'
import Testimonial from "../components/UI/Testimonial";
import { Container, Row, Col } from "reactstrap";

const Testimonials = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4 text-center">
            <h6 className="section__subtitle">Our clients says</h6>
            <h2 className="section__title">Testimonials</h2>
          </Col>
          <Testimonial />
        </Row>
      </Container>
  </section>
  )
}

export default Testimonials