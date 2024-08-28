import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Input, Button } from "reactstrap";
import {
  apiGetFooterInfo,
  apiPostUpdateFooterInfo,
} from "../../../../firebase/firestore/queries";
import { Loader } from "../../../Loader";

export const QuickLinksTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("view");
  const [isCreating, setIsCreating] = useState(false);
  const [newLink, setNewLink] = useState({ label: "", link: "" });

  const formik = useFormik({
    initialValues: {
      quickLinks: [],
    },
  });

  const handleChange = (index, name, value) => {
    formik.setFieldValue(`quickLinks.${index}.${name}`, value);
  };

  const handleRemoveLink = (index) => {
    const remainingLinks = formik.values.quickLinks.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("quickLinks", remainingLinks);
  };

  const handleGetFooterInfo = async () => {
    setIsLoading(true);
    const response = await apiGetFooterInfo("quickLinks");
    if (response) {
      formik.setFieldValue("quickLinks", response.quickLinks);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setMode("view");
    handleGetFooterInfo();
  };

  const handleSaveChanges = async () => {
    if (newLink.label !== "" && newLink.link !== "") {
      formik.values.quickLinks.push(newLink);
    }
    await apiPostUpdateFooterInfo(formik.values, "quickLinks");
    setMode("view");
    handleGetFooterInfo();
  };

  useEffect(() => {
    handleGetFooterInfo();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="d-flex align-items-center justify-content-end mt-2 gap-2">
        {mode === "view" ? (
          <>
            {isCreating ? (
              <>
                <Button
                  onClick={() => {
                    setNewLink({ label: "", link: "" });
                    setIsCreating(false);
                  }}
                >
                  <i class="ri-close-line ri-lg" /> Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleSaveChanges();
                    setIsCreating(false);
                    setNewLink({ label: "", link: "" });
                  }}
                >
                  <i class="ri-save-line ri-lg" /> Save
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsCreating(true)}>
                  <i class="ri-add-line ri-lg" /> Add
                </Button>
                <Button onClick={() => setMode("edit")}>
                  <i class="ri-edit-line ri-lg" /> Edit
                </Button>
              </>
            )}
          </>
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

      {isCreating && (
        <form>
          <div
            style={{
              width: "100%",
              height: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              gap: 12,
            }}
          >
            <div style={{ width: "50%" }}>
              <Input
                placeholder="Label"
                type="text"
                value={newLink.label}
                onChange={(e) =>
                  setNewLink({ ...newLink, label: e.target.value })
                }
                required
              />
            </div>
            <div style={{ width: "50%" }}>
              <Input
                placeholder="Link"
                type="text"
                value={newLink.link}
                onChange={(e) =>
                  setNewLink({ ...newLink, link: e.target.value })
                }
                required
              />
            </div>
          </div>
        </form>
      )}

      <div style={{ marginLeft: -32, marginTop: 24 }}>
        {mode === "view" ? (
          <div>
            <ul>
              {formik.values.quickLinks.map((quickLink, index) => (
                <div
                  style={{
                    height: 40,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    marginTop: 8,
                    padding: 8,
                  }}
                >
                  <li key={index} style={{ marginTop: 8 }}>
                    {index + 1}.{" "}
                    <a href={quickLink.link} style={{ textDecoration: "none" }}>
                      {quickLink.label}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <ul>
            {formik.values.quickLinks.map((quickLink, index) => (
              <>
                {quickLink?.label && (
                  <li
                    key={index}
                    style={{ marginTop: 4, position: "relative" }}
                  >
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        marginTop: 8,
                        gap: 12,
                      }}
                    >
                      <div style={{ width: "48%" }}>
                        <Input
                          type="text"
                          value={quickLink.label}
                          onChange={(e) =>
                            handleChange(index, "label", e.target.value)
                          }
                          width={"100%"}
                        />
                      </div>

                      <div style={{ width: "48%" }}>
                        <Input
                          type="text"
                          value={quickLink.link}
                          onChange={(e) =>
                            handleChange(index, "link", e.target.value)
                          }
                          width={"100%"}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 8,
                        top: 8,
                      }}
                      onClick={() => handleRemoveLink(index)}
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
    </div>
  );
};
