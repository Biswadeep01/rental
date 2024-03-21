import React, { useState } from "react";
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
import { signUp } from "../../services";

const validationSchema = yup.object({
  firstName: yup.string().required("*required"),
  lastName: yup.string().required("*required"),
  phoneNumber: yup
    .string()
    .matches(/^[1-9][0-9]{9}$/, "Invalid phone number")
    .required("*required"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .required("*required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("*required"),
});

const SignUp = ({ setAuthNavigation }) => {
  const [message, setMessage] = useState(""); // success | error

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const response = await signUp({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        password: values.password,
      });
      if (!response) {
        setMessage("error");
      } else {
        setMessage("success");
      }
    },
  });
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

          {message && (
            <Row>
              <Col
                md={"12"}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Toast
                  className={`${
                    message === "success" ? "bg-success" : "bg-danger"
                  } rounded`}
                  style={styles.messageContainer}
                >
                  <ToastBody style={styles.messsage}>
                    {message === "success"
                      ? "Registered succesfully"
                      : "Unable to register"}
                  </ToastBody>
                  <i
                    class="ri-close-circle-fill ri-lg"
                    style={{ color: "white" }}
                    onClick={() => setMessage("")}
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
                    <Label>Enter first name</Label>
                    <Input
                      placeholder="John"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                    />
                    {Boolean(formik.errors.firstName) && (
                      <FormText style={styles.helperText} color={"#c1121f"}>
                        {formik.errors.firstName}
                      </FormText>
                    )}
                  </Col>
                  <Col>
                    <Label>Enter last name</Label>
                    <Input
                      placeholder="Doe"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                    {Boolean(formik.errors.lastName) && (
                      <FormText style={styles.helperText} color={"#c1121f"}>
                        {formik.errors.lastName}
                      </FormText>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>Enter phone number</Label>
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
                <Row>
                  <Col>
                    <Label>Confirm password</Label>
                    <Input
                      placeholder="********"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                    {Boolean(formik.errors.confirmPassword) && (
                      <FormText style={styles.helperText} color={"#c1121f"}>
                        {formik.errors.confirmPassword}
                      </FormText>
                    )}
                  </Col>
                </Row>
                <Button style={styles.signUpBtn} type="submit">
                  Sign Up
                </Button>
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
