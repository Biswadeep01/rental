import React, { useState } from "react";
import {
  Alert,
  Container,
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Row,
  FormText,
} from "reactstrap";
import { Helmet } from "react-helmet-async";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";
import * as yup from "yup";
import { apiPostCreateTestimonial } from "../firebase/firestore/queries";
import "../styles/contact.css";

const validationSchema = yup.object({
  name: yup.string().required("*required"),
  email: yup.string().required("*required"),
  description: yup.string().required("*required"),
});

const Contact = () => {
  const [submissionType, setSubmissionType] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        if (submissionType === "feedback") {
          await apiPostCreateTestimonial({
            id: uuid(),
            ...values,
            createdAt: new Date().toISOString(),
          });
          formik.resetForm();
          setSubmissionType("");
          setAlert({
            message: "Thank you for your feedback!",
            type: "success",
          });
        }
      } catch (err) {
        console.log(err);
        setAlert({
          message: "Something went wrong. Please try again.",
          type: "danger",
        });
      }
    },
  });

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

        {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}

        <Form onSubmit={formik.handleSubmit}>
          <div style={styles.formContainer}>
            <Row>
              <Col>
                <Label>Enter Name</Label>

                <Input
                  placeholder="John Doe"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />

                {Boolean(formik.errors.name) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.name}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label>Enter email address</Label>

                <Input
                  placeholder="johndoe@email.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                {Boolean(formik.errors.email) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.email}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label>Message</Label>

                <Input
                  placeholder="Your Message..."
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  type="textarea"
                  style={{ height: 100 }}
                />

                {Boolean(formik.errors.description) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.description}
                  </FormText>
                )}
              </Col>
            </Row>

            <FormGroup row tag="fieldset">
              <p>Choose</p>

              <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
                <FormGroup check onClick={() => setSubmissionType("feedback")}>
                  <Input
                    name="radio2"
                    type="radio"
                    checked={submissionType === "feedback"}
                  />
                  <Label check>Feedback</Label>
                </FormGroup>

                <FormGroup check onClick={() => setSubmissionType("query")}>
                  <Input
                    name="radio2"
                    type="radio"
                    checked={submissionType === "query"}
                  />
                  <Label check>Query</Label>
                </FormGroup>
              </div>
            </FormGroup>

            <Button style={styles.signUpBtn} type="submit">
              Submit
            </Button>
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
