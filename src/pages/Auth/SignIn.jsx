import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Form,
  FormText,
  Input,
  Label,
  Card,
  CardBody,
  CardTitle,
  Container,
  Col,
  Row,
  Toast,
  ToastBody,
} from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "../../services";

const validationSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("*required"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .required("*required"),
});

const SignIn = ({ setAuthNavigation }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await signIn({
        phoneNumber: values.phoneNumber,
        password: values.password,
      });
      console.log(response);
      if (!response) {
        setMessage(true);
      } else {
        navigate("/home");
      }
    },
  });

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

          {message && (
            <Row>
              <Col
                md={"12"}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Toast
                  className="bg-danger rounded"
                  style={styles.messageContainer}
                >
                  <ToastBody style={styles.messsage}>
                    Login failed! Please try again
                  </ToastBody>
                  <i
                    class="ri-close-circle-fill ri-lg"
                    style={{ color: "white" }}
                    onClick={() => setMessage(false)}
                  />
                </Toast>
              </Col>
            </Row>
          )}

          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <div style={styles.formContainer}>
                <Row>
                  <Col>
                    <Label>Enter your phoneNumber</Label>
                    <Input
                      placeholder="9988776655"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                    {Boolean(formik.errors.phoneNumber) && (
                      <FormText style={styles.helperText} color={"#c1121f"}>
                        {formik.errors.phoneNumber}
                      </FormText>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>Enter your password</Label>
                    <Input
                      placeholder="********"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {Boolean(formik.errors.password) && (
                      <FormText style={styles.helperText} color={"#c1121f"}>
                        {formik.errors.password}
                      </FormText>
                    )}
                  </Col>
                </Row>
                <Button style={styles.signInBtn} type="submit">
                  Sign in
                </Button>
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
  helperText: {
    marginLeft: 10,
    color: "#c1121f",
    fontSize: 12,
  },
  messageContainer: {
    width: "95%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
  },
  messsage: {
    color: "#FFFFFF",
  },
};
