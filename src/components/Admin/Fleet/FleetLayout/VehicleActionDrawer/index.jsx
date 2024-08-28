import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Button,
  Form,
  FormText,
  Input,
  Label,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import isEmpty from "lodash.isempty";
import { storage } from "../../../../../firebase/config";
import { Drawer } from "../../../../UI/Drawer";
import { Counter } from "./NumericCounter";

const validationSchema = yup.object({
  imageUrl: yup.string().required("*required"),
  model: yup.string().required("*required"),
  pricePerDay: yup.number().required("*required"),
  adult: yup
    .number("Must be a number")
    .min(0, "Must be greater than or equal 0"),
  child: yup
    .number("Must be a number")
    .min(0, "Must be greater than or equal 0"),
  luggageCapacity: yup.number(),
  totalCount: yup
    .number("Must be a number")
    .min(0, "Must be greater than or equal 0"),
});

export const VehicleActionDrawer = ({
  header = "Create Vehicle",
  action = "Create",
  car,
  onSubmit,
  onClose,
}) => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      model: car?.model || "",
      pricePerDay: car?.pricePerDay || 0.0,
      adult: car?.passengers?.adult || 0,
      child: car?.passengers?.child || 0,
      luggageCapacity: car?.luggageCapacity || 0,
      totalCount: car?.totalCount || 0,
      imageUrl: car?.imageUrl || "",
    },
    onSubmit,
  });

  const [showLoader, setShowLoader] = useState(false);

  const handleDrop = useCallback(async (acceptedFiles) => {
    setShowLoader(true);
    const uploadPromises = acceptedFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const id = uuid();
          const storageRef = ref(storage, `/cars/${id}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              console.log(error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        })
    );

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      formik.setFieldValue("imageUrl", uploadedUrls[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    multiple: false,
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
                <div
                  style={{
                    background: "#F4F6F8",
                    px: 4,
                    height: 148,
                    borderRadius: 5,
                    borderStyle: "dotted",
                    borderColor: isDragActive ? "#007B55" : "#919EAB",
                  }}
                >
                  {!isEmpty(formik.values.imageUrl) ? (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        textAlign: "center",
                        gap: 24,
                      }}
                    >
                      <a
                        href={formik.values.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Preview
                      </a>

                      <Button
                        onClick={() => formik.setFieldValue("imageUrl", "")}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ height: 24, width: 52 }}
                        >
                          <i class="ri-close-line ri-lg" />
                          Clear
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                      {...getRootProps({ className: "dropzone" })}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <>
                          <>
                            {showLoader ? (
                              <Spinner color="primary" />
                            ) : (
                              <>
                                <p
                                  textAlign="center"
                                  color="#6c757d"
                                  variant="subtitle2"
                                >
                                  Drag &apos;n&apos; drop vehicle image here,{" "}
                                  <br /> or click to select file
                                </p>
                              </>
                            )}
                          </>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {Boolean(formik.errors.imageUrl) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.imageUrl}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label style={styles.label}>Model</Label>
                <Input
                  name="model"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                />

                {Boolean(formik.errors.model) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.model}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col style={{ position: "relative" }}>
                <Label style={styles.label}>Price per day</Label>
                <Input
                  placeholder="0.0"
                  name="pricePerDay"
                  value={formik.values.pricePerDay}
                  onChange={formik.handleChange}
                />

                <b style={{ position: "absolute", right: 24, top: 36 }}>$</b>

                {Boolean(formik.errors.model) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.model}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <Label style={styles.label}>Adults</Label>
                <Counter
                  value={formik.values.adult}
                  onIncrement={() =>
                    formik.setFieldValue("adult", formik.values.adult + 1)
                  }
                  onDecrement={() => {
                    if (formik.values.adult > 0) {
                      formik.setFieldValue("adult", formik.values.adult - 1);
                    }
                  }}
                />

                {Boolean(formik.errors.adult) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.adult}
                  </FormText>
                )}
              </Col>

              <Col lg="6">
                <Label style={styles.label}>Child</Label>
                <Counter
                  value={formik.values.child}
                  onIncrement={() =>
                    formik.setFieldValue("child", formik.values.child + 1)
                  }
                  onDecrement={() => {
                    if (formik.values.child > 0) {
                      formik.setFieldValue("child", formik.values.child - 1);
                    }
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <Label style={styles.label}>Luggages</Label>
                <Counter
                  value={formik.values.luggageCapacity}
                  onIncrement={() =>
                    formik.setFieldValue(
                      "luggageCapacity",
                      formik.values.luggageCapacity + 1
                    )
                  }
                  onDecrement={() => {
                    if (formik.values.luggageCapacity > 0) {
                      formik.setFieldValue(
                        "luggageCapacity",
                        formik.values.luggageCapacity - 1
                      );
                    }
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <Label style={styles.label}>Total number of vehicles</Label>
                <Input
                  placeholder="0"
                  name="totalCount"
                  value={formik.values.totalCount}
                  onChange={formik.handleChange}
                />
                {Boolean(formik.errors.totalCount) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.totalCount}
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
