import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Col, Input, Row, Spinner, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import isEmpty from "lodash.isempty";
import { storage } from "../../../../firebase/config";
import {
  apiGetAboutInfo,
  apiPostUpdateAboutInfo,
} from "../../../../firebase/firestore/queries";
import { Dialog } from "../../../Dialog";
import { Loader } from "../../../Loader";

export const InfoTab = () => {
  const formik = useFormik({
    initialValues: {
      description: "",
      image: "",
      reasonsToChooseUs: [],
    },
  });

  const [mode, setMode] = useState("view");
  const [isLoading, setIsLoading] = useState(false);
  const [aboutInfo, setAboutInfo] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleDrop = useCallback(async (acceptedFiles) => {
    setShowLoader(true);
    const uploadPromises = acceptedFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const id = uuid();
          const storageRef = ref(storage, `/images/${id}`);
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

  const handleGetAboutInfo = async () => {
    setIsLoading(true);
    const response = await apiGetAboutInfo();
    setAboutInfo(response);
    formik.setFieldValue("description", response.description);
    formik.setFieldValue("image", response.image);
    formik.setFieldValue("reasonsToChooseUs", response.reasonsToChooseUs);
    setIsLoading(false);
  };

  const handleChange = (index, value) => {
    const reasonsToChooseUs = [...formik.values.reasonsToChooseUs];
    reasonsToChooseUs[index] = value;
    formik.setFieldValue("reasonsToChooseUs", reasonsToChooseUs);
  };

  const handleCancel = () => {
    if (JSON.stringify(formik.values) !== JSON.stringify(aboutInfo)) {
      setUnsavedChanges(true);
    } else {
      setMode("view");
    }
  };

  const handleSaveChanges = async () => {
    setMode("view");

    const nonEmptyReasonsToChooseUs = formik.values.reasonsToChooseUs.filter(
      (reason) => reason !== ""
    );

    await apiPostUpdateAboutInfo({
      description: formik.values.description,
      image: formik.values.image,
      reasonsToChooseUs: nonEmptyReasonsToChooseUs,
    });

    handleGetAboutInfo();
  };

  useEffect(() => {
    handleGetAboutInfo();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}

      <div className="d-flex align-items-center justify-content-end mt-2 gap-2">
        {mode === "view" ? (
          <Button onClick={() => setMode("edit")}>
            <i class="ri-edit-line ri-lg" /> Edit
          </Button>
        ) : (
          <>
            <Button onClick={handleCancel}>
              <i class="ri-close-line ri-lg" />
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              <i class="ri-save-line ri-lg" /> Save
            </Button>
          </>
        )}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Row style={{ marginTop: 24 }}>
          <Col lg="7" md="7" sm="12">
            <Input
              type="textarea"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Description"
              width={"100%"}
              style={{ height: 300 }}
              disabled={mode === "view"}
            />
          </Col>

          <Col lg="5" md="5" sm="12">
            {mode === "view" ? (
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={formik.values.image}
                  alt="about"
                  style={{ width: 500, height: 300 }}
                />
              </div>
            ) : (
              <div
                style={{
                  background: "#F4F6F8",
                  px: 4,
                  height: 300,
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
                                Drag &apos;n&apos; drop image here, <br /> or
                                click to select file
                              </p>
                            </>
                          )}
                        </>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>

        <div style={{ marginLeft: -32, marginTop: 20 }}>
          {mode === "view" ? (
            <ul>
              {formik.values.reasonsToChooseUs.map((reason, index) => (
                <li key={index} style={{ marginTop: 8 }}>
                  {index + 1}. {reason}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {formik.values.reasonsToChooseUs.map((reason, index) => (
                <>
                  {reason && (
                    <li
                      key={index}
                      style={{ marginTop: 4, position: "relative" }}
                    >
                      <Input
                        type="text"
                        value={reason}
                        onChange={(e) => handleChange(index, e.target.value)}
                        width={"100%"}
                      />
                      <div
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: 8,
                          top: 8,
                        }}
                        onClick={() => handleChange(index, "")}
                      >
                        <i className="ri-close-line ri-lg" />
                      </div>
                    </li>
                  )}
                </>
              ))}
            </ul>
          )}
        </div>
      </form>

      {unsavedChanges && (
        <Dialog
          open
          header="Unsaved Changes"
          message="You have unsaved changes. Are you sure you want to leave?"
          onConfirm={() => {
            handleGetAboutInfo();
            setUnsavedChanges(false);
            setMode("view");
          }}
          onClose={() => {
            setUnsavedChanges(false);
          }}
          closeBtnText={"Cancel"}
          confirmBtnText={"Leave"}
        />
      )}
    </div>
  );
};
