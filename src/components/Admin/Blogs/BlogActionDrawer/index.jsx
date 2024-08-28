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
import { storage } from "../../../../firebase/config";
import { Drawer } from "../../../UI/Drawer";

const validationSchema = yup.object({
  title: yup.string().required("*required"),
  description: yup.string().required("*required"),
});

export const BlogActionDrawer = ({
  header = "Create Blog",
  action = "Create",
  blog,
  onSubmit,
  onClose,
}) => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: blog?.title || "",
      description: blog?.description || "",
      image: blog?.image || "",
      author: blog?.author || "",
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
          const storageRef = ref(storage, `/blogs/${id}`);
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
      formik.setFieldValue("image", uploadedUrls[0]);
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
                  {!isEmpty(formik.values.image) ? (
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
                        href={formik.values.image}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Preview
                      </a>

                      <Button onClick={() => formik.setFieldValue("image", "")}>
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
                                  Drag &apos;n&apos; drop blog image here,{" "}
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

                {Boolean(formik.errors.image) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.image}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label style={styles.label}>Title</Label>
                <Input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />

                {Boolean(formik.errors.title) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.title}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label style={styles.label}>Description</Label>
                <Input
                  name="description"
                  type="textarea"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  style={{ height: "200px" }}
                />

                {Boolean(formik.errors.description) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.description}
                  </FormText>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label style={styles.label}>Author</Label>
                <Input
                  name="author"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  disabled={action !== "create"}
                />

                {Boolean(formik.errors.author) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.author}
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
