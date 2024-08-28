import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDropzone } from "react-dropzone";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Button, Col, Row, Spinner } from "reactstrap";
import isEmpty from "lodash.isempty";
import { storage } from "../../../firebase/config";

export const ImgUpload = ({ uploadText, bgImg, setBgImg }) => {
  const [showLoader, setShowLoader] = useState(false);

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
      setBgImg(uploadedUrls[0]);
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
          {!isEmpty(bgImg) ? (
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
              <a href={bgImg} target="_blank" rel="noreferrer">
                Preview
              </a>

              <Button onClick={() => setBgImg("")}>
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
                          {uploadText}
                        </p>
                      </>
                    )}
                  </>
                </>
              )}
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};
