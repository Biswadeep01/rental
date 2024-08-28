import React from "react";
import { Button, Form, FormText, Input, Label, Col, Row } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Drawer } from "../../../UI/Drawer";

const validationSchema = yup.object({
  name: yup.string().required("*required"),
  description: yup.string().required("*required"),
});

export const TestimonalActionDrawer = ({
  header = "Create Testimonal",
  action = "Create",
  onSubmit,
  onClose,
}) => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit,
  });

  return (
    <Drawer open>
      <div className="d-flex justify-content-between align-items-center">
        <h4 style={styles.title}>{header}</h4>
        <i
          class="ri-close-line ri-2x"
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
      </div>

      <div className="mt-2">
        <Form onSubmit={formik.handleSubmit}>
          <div style={styles.formContainer}>
            <Row>
              <Col>
                <Label style={styles.label}>Name</Label>
                <Input
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
                <Label style={styles.label}>Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  style={{ height: 200 }}
                />

                {Boolean(formik.errors.description) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.description}
                  </FormText>
                )}
              </Col>
            </Row>

            <Button
              type="submit"
              color="primary"
              block
              style={{ textTransform: "capitalize" }}
            >
              {action}
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontWeight: 600,
    marginTop: "1rem",
  },
  helperText: {
    marginLeft: 10,
    color: "#c1121f",
    fontSize: 12,
  },
};
