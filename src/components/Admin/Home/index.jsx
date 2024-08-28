import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {
  apiGetHomeInfo,
  apiPostUpdateHomeInfo,
} from "../../../firebase/firestore/queries";
import { ImgUpload } from "./ImgUpload";
import { Dialog } from "../../Dialog";
import { Loader } from "../../Loader";

export const HomeSettings = () => {
  const [mode, setMode] = useState("view");
  const [isLoading, setIsLoading] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [initialHomeInfo, setInitialHomeInfo] = useState({});
  const [homeInfo, setHomeInfo] = useState({});

  const handleGetHomeInfo = async () => {
    setIsLoading(true);
    const response = await apiGetHomeInfo();
    setHomeInfo(response);
    setInitialHomeInfo(response);
    setIsLoading(false);
  };

  const handleChange = (name, bgImg) => {
    setHomeInfo({ ...homeInfo, [name]: bgImg });
  };

  const handleCancel = () => {
    if (JSON.stringify(homeInfo) !== JSON.stringify(initialHomeInfo)) {
      setUnsavedChanges(true);
    } else {
      setMode("view");
    }
  };

  const handleSaveChanges = async () => {
    await apiPostUpdateHomeInfo(homeInfo);
    setMode("view");
    handleGetHomeInfo();
  };

  useEffect(() => {
    handleGetHomeInfo();
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

      <div className="d-flex justify-content-start align-items-center mt-2 gap-4">
        <div className="w-50">
          {mode === "view" ? (
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={homeInfo?.homeBgImg || ""}
                alt="home"
                style={{ height: 300, width: 512, objectFit: "cover" }}
              />
            </div>
          ) : (
            <ImgUpload
              uploadText={
                <p className="mt-2">
                  Drag &apos;n&apos; drop background home image here, <br /> or
                  click to select file
                </p>
              }
              bgImg={homeInfo?.homeBgImg || ""}
              setBgImg={(img) => handleChange("homeBgImg", img)}
            />
          )}
        </div>

        <div className="w-50">
          {mode === "view" ? (
            <div className="justify-content-center align-items-center">
              <img
                src={homeInfo?.homeCarImg || ""}
                alt="var"
                style={{ height: 300, width: 512, objectFit: "cover" }}
              />
            </div>
          ) : (
            <ImgUpload
              uploadText={
                <p className="mt-2">
                  Drag &apos;n&apos; drop vehicle image here, <br /> or click to
                  select file
                </p>
              }
              bgImg={homeInfo?.homeCarImg || ""}
              setBgImg={(img) => handleChange("homeCarImg", img)}
            />
          )}
        </div>
      </div>

      {unsavedChanges && (
        <Dialog
          open
          header="Unsaved Changes"
          message="You have unsaved changes. Are you sure you want to leave?"
          onConfirm={() => {
            handleGetHomeInfo();
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
