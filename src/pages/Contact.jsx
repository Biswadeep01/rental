import React from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Row,
} from "reactstrap";
import { Helmet } from "react-helmet-async";
import "../styles/contact.css";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Contact Us </title>
      </Helmet>
      <Container className="my-5">
        <Col lg="12" className="text-left mt-5 mb-3">
          <h2 className="section__title" style={{ color: "black" }}>
            Reach out to us
          </h2>
        </Col>
        <Form>
          <div style={styles.formContainer}>
            <Row>
              <Col>
                <Label>Enter Name</Label>
                <Input placeholder="John " />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Enter email address</Label>
                <Input placeholder="johndoe@email.com" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Message</Label>
                <Input
                  placeholder="Your Message..."
                  type="textarea"
                  style={{ height: 100 }}
                />
              </Col>
            </Row>
            <FormGroup row tag="fieldset">
              <p>Choose</p>
              <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
                <FormGroup check>
                  <Input name="radio2" type="radio" />
                  <Label check>Feedback</Label>
                </FormGroup>
                <FormGroup check>
                  <Input name="radio2" type="radio" />
                  <Label check>Query</Label>
                </FormGroup>
              </div>
            </FormGroup>
            <Button style={styles.signUpBtn}>Submit</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Contact;

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  signUpBtn: {
    background: "#039594",
  },
  bottomText: {
    fontSize: 15,
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  title: {
    fontWeight: 600,
    marginTop: "2.5rem",
    textAlign: "center",
  },
};
