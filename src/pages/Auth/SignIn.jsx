import React from "react";
import {
  Button,
  Form,
  //   FormText,
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

const SignIn = ({ setAuthNavigation }) => {
  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Sign In </title>
      </Helmet>
      <Container>
        <Card>
          <CardTitle tag="h2" style={styles.title}>
            Sign In
          </CardTitle>

          <CardBody>
            <Form>
              <div style={styles.formContainer}>
                <Row>
                  <Col>
                    <div>
                      <Label>Enter your email</Label>
                      <Input placeholder="user@example.com" />
                      {/* <FormText style={{ marginLeft: 10 }}>
                      Example help text that remains unchanged.
                    </FormText> */}
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
                <Button style={styles.signInBtn}>Sign in</Button>
                <Row>
                  <p
                    style={styles.bottomText}
                    onClick={() => setAuthNavigation(1)}
                  >
                    Not registered yet ?{" "}
                    <span style={{ color: "#039594" }}>Sign up</span>
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

export default SignIn;

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  signInBtn: {
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
