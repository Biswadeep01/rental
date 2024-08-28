import React, { useEffect, useState } from "react";
import { useAppStore } from "../../../../store";
import { Row, Col } from "reactstrap";
import { CarItem } from "./Vehicle";
import isEmpty from "lodash.isempty";
import { VehicleActionDrawer } from "./VehicleActionDrawer";
import {
  apiPostAddModel,
  apiPutUpdateModel,
  apiDeleteModel,
} from "../../../../services/cars";
import { Dialog } from "../../../Dialog";
import { Loader } from "../../../Loader";

export const FleetSettings = () => {
  const { cars, fetchCars } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelectCar = (car) => {
    setIsEditing(true);
    setSelectedCar(car);
  };

  const handleUpdateCar = async (values) => {
    setIsLoading(true);
    await apiPutUpdateModel({
      id: selectedCar.id,
      ...values,
      passengers: { adult: values.adult, child: values.child },
    });
    await fetchCars();
    setSelectedCar(null);
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleCreateCar = async (values) => {
    setIsLoading(true);
    await apiPostAddModel({
      ...values,
      passengers: { adult: values.adult, child: values.child },
    });
    await fetchCars();
    setIsCreating(false);
    setIsLoading(false);
  };

  const handleDeleteCar = async () => {
    setIsLoading(true);
    await apiDeleteModel({ id: selectedCar.id });
    await fetchCars();
    setIsDeleting(false);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div>
      {isLoading && <Loader />}

      <Row>
        <Col lg="3" md="4" sm="6">
          <div
            style={{
              borderRadius: 10,
              borderStyle: "dotted",
              borderColor: "#49505750",
              height: 348,
              background: "#f8f9fa",
              cursor: "pointer",
            }}
            onClick={() => setIsCreating(true)}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <p
                style={{
                  fontWeight: "normal",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                <i class="ri-add-circle-line ri-lg"></i> <br /> Add new model
              </p>
            </div>
          </div>
        </Col>

        {!isEmpty(cars) && (
          <>
            {cars.map((item) => (
              <Col key={item.id} lg="4" md="4" sm="6">
                <CarItem
                  {...item}
                  onSelect={() => handleSelectCar(item)}
                  onDelete={() => {
                    setIsDeleting(true);
                    setSelectedCar(item);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>

      {isEditing && (
        <VehicleActionDrawer
          header="Edit Model"
          action="update"
          car={selectedCar}
          onSubmit={handleUpdateCar}
          onClose={() => {
            setSelectedCar(null);
            setIsEditing(false);
          }}
        />
      )}

      {isCreating && (
        <VehicleActionDrawer
          header="Add New Model"
          action="create"
          onSubmit={handleCreateCar}
          onClose={() => setIsCreating(false)}
        />
      )}

      {isDeleting && (
        <Dialog
          open={isDeleting}
          header={
            <p style={{ textAlign: "center" }}>
              Are you sure you want to delete <br /> <b>{selectedCar.model}</b>{" "}
              model?
            </p>
          }
          onConfirm={handleDeleteCar}
          onClose={() => {
            setSelectedCar(null);
            setIsDeleting(false);
          }}
          confirmBtnText={"Delete"}
          closeBtnText={"Cancel"}
        />
      )}
    </div>
  );
};
