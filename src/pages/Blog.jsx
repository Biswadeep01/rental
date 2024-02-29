import React from 'react'
import { Container, Row, Col } from "reactstrap";
import BlogList from "../components/UI/BlogList";

const Blog = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5 text-center">
            <h6 className="section__subtitle">Explore our blogs</h6>
            <h2 className="section__title">Latest Blogs</h2>
          </Col>

          <BlogList />
        </Row>
      </Container>
    </section>
  )
}

export default Blog