import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet-async";
import BlogList from "../components/UI/BlogList";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Blogs </title>
      </Helmet>
      <Container className="mt-5">
        <Row>
          <Col lg="12" className="mb-5 text-center">
            <h6 className="section__subtitle">Explore our blogs</h6>
            <h2 className="section__title">Latest Blogs</h2>
          </Col>
          <BlogList />
        </Row>
      </Container>
    </>
  );
};

export default Blog;
