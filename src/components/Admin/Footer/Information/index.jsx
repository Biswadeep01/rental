import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input, Button } from "reactstrap";
import {
  apiGetFooterInfo,
  apiPostUpdateFooterInfo,
} from "../../../../firebase/firestore/queries";
import { Dialog } from "../../../Dialog";
import { Loader } from "../../../Loader";

export const InfoTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("view");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [footerInfo, setFooterInfo] = useState({});

  const formik = useFormik({
    initialValues: {
      description: "",
    },
  });

  const handleCancel = () => {
    if (JSON.stringify(formik.values) !== JSON.stringify(footerInfo)) {
      setUnsavedChanges(true);
    } else {
      setMode("view");
    }
  };

  const handleSaveChanges = async () => {
    await apiPostUpdateFooterInfo(formik.values, "information");
    setMode("view");
    handleGetFooterInfo();
  };

  const handleGetFooterInfo = async () => {
    setIsLoading(true);
    const response = await apiGetFooterInfo("information");
    setFooterInfo(response);
    formik.setFieldValue("description", response.description);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetFooterInfo();
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

      <Form>
        <Row style={{ marginTop: 24 }}>
          <Col lg="12" md="12" sm="12">
            <Input
              type="textarea"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Description"
              width={"100%"}
              style={{ height: 200 }}
              disabled={mode === "view"}
            />
          </Col>
        </Row>
      </Form>

      {unsavedChanges && (
        <Dialog
          open
          header="Unsaved Changes"
          message="You have unsaved changes. Are you sure you want to leave?"
          onConfirm={() => {
            handleGetFooterInfo();
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
