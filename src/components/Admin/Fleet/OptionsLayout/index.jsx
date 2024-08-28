import React, { useEffect, useState } from "react";
import { Input, Button } from "reactstrap";
import { useFormik } from "formik";
import {
  apiGetOptions,
  apiPostUpdateOptions,
} from "../../../../firebase/firestore/queries";
import { Loader } from "../../../Loader";

export const OptionsLayout = () => {
  const [mode, setMode] = useState("view");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newOption, setNewOption] = useState({ label: "", price: 0 });

  const formik = useFormik({
    initialValues: {
      options: [],
    },
  });

  const handleChange = (index, name, value) => {
    formik.setFieldValue(`options.${index}.${name}`, value);
  };

  const handleRemoveOption = (index) => {
    const remainingOptions = formik.values.options.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("options", remainingOptions);
  };

  const handleGetAdditionalOptions = async () => {
    setIsLoading(true);
    const response = await apiGetOptions();
    if (response) {
      formik.setFieldValue("options", response.options);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setMode("view");
  };

  const handleSaveChanges = async () => {
    if (newOption.label !== "" && newOption.price !== "") {
      formik.values.options.push({
        label: newOption.label,
        price: newOption.price,
      });
    }
    await apiPostUpdateOptions(formik.values);
    setMode("view");
    setNewOption({ label: "", price: "" });
    setIsCreating(false);
    handleGetAdditionalOptions();
  };

  useEffect(() => {
    handleGetAdditionalOptions();
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
                    setNewOption({ label: "", price: "" });
                    setIsCreating(false);
                  }}
                >
                  <i class="ri-close-line ri-lg" /> Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
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
          <p>Add new option</p>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: "50%" }}>
              <Input
                placeholder="Label"
                type="text"
                value={newOption.label}
                onChange={(e) =>
                  setNewOption({ ...newOption, label: e.target.value })
                }
                required
              />
            </div>
            <div style={{ width: "50%" }}>
              <Input
                placeholder="Price"
                type="text"
                value={newOption.price}
                onChange={(e) =>
                  setNewOption({ ...newOption, price: e.target.value })
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
              {formik.values.options.map((option, index) => (
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
                    {index + 1}. {option.label} &nbsp;&nbsp;{" "}
                    <b>${option.price}</b>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <ul>
            {formik.values.options.map((option, index) => (
              <>
                {option?.label && (
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
                          value={option.label}
                          onChange={(e) =>
                            handleChange(index, "label", e.target.value)
                          }
                          width={"100%"}
                        />
                      </div>

                      <div style={{ width: "48%" }}>
                        <Input
                          type="text"
                          value={option.price}
                          onChange={(e) =>
                            handleChange(index, "price", e.target.value)
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
                      onClick={() => handleRemoveOption(index)}
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
