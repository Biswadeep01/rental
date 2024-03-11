import React from "react";
import {
  Button,
  Form,
  Input,
  Label,
  Card,
  CardBody,
  CardTitle,
  Container,
  Col,
  Row,
} from "reactstrap";
import { Helmet } from "react-helmet-async";

const SignUp = ({ setAuthNavigation }) => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Sign Up </title>
      </Helmet>

      <Container>
        <Card>
          <CardTitle tag="h2" style={styles.title}>
            Sign Up
          </CardTitle>

          <CardBody>
            <Form>
              <div style={styles.formContainer}>
                <Row>
                  <Col>
                    <div>
                      <Label>Enter first name</Label>
                      <Input placeholder="John" />
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Label>Enter last name</Label>
                      <Input placeholder="Doe" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <Label>Enter phone number</Label>
                      <Input placeholder="9988776655" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <Label>Enter your password</Label>
                      <Input placeholder="********" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <Label>Confirm password</Label>
                      <Input placeholder="********" />
                    </div>
                  </Col>
                </Row>
                <Button style={styles.signUpBtn}>Sign Up</Button>
                <Row>
                  <p
                    style={styles.bottomText}
                    onClick={() => setAuthNavigation(0)}
                  >
                    Already registered ?{" "}
                    <span style={{ color: "#039594" }}>Sign in</span>
                  </p>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default SignUp;

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
