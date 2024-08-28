import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { v4 as uuid } from "uuid";
import { Service } from "./Service";
import { ServiceActionDrawer } from "./ServiceActionDrawer";
import { Dialog } from "../../Dialog";
import {
  apiGetServices,
  apiPostCreateService,
  apiPutUpdateService,
  apiDeleteService,
} from "../../../firebase/firestore/queries";
import { Loader } from "../../Loader";

export const ServiceSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleGetServices = async () => {
    setIsLoading(true);
    const data = await apiGetServices();
    setServices(data);
    setIsLoading(false);
  };

  const handleCreateService = async (values) => {
    await apiPostCreateService({ id: uuid(), ...values });
    handleGetServices();
    setIsCreating(false);
  };

  const handlePutUpdateService = async (values) => {
    await apiPutUpdateService({ id: selectedService.id, ...values });
    handleGetServices();
    setIsEditing(false);
    setSelectedService(null);
  };

  const handleDeleteService = async () => {
    await apiDeleteService(selectedService.id);
    handleGetServices();
    setIsDeleting(false);
    setSelectedService(null);
  };

  useEffect(() => {
    handleGetServices();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}

      <Row className="g-2">
        <Col lg="4" md="4" sm="6">
          <div
            style={{
              borderRadius: 10,
              borderStyle: "dotted",
              borderColor: "#49505750",
              height: 200,
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
                <i class="ri-add-circle-line ri-lg"></i> <br /> Add new service
              </p>
            </div>
          </div>
        </Col>

        {services.map((service) => (
          <Col key={service.id} lg="4" md="4" sm="6">
            <Service
              key={service.id}
              {...service}
              onSelect={() => {
                setIsEditing(true);
                setSelectedService(service);
              }}
              onDelete={() => {
                setIsDeleting(true);
                setSelectedService(service);
              }}
            />
          </Col>
        ))}
      </Row>

      {isCreating && (
        <ServiceActionDrawer
          header="Add New Service"
          action="Create"
          onSubmit={handleCreateService}
          onClose={() => setIsCreating(false)}
        />
      )}

      {isEditing && (
        <ServiceActionDrawer
          header="Edit Service"
          action="Update"
          service={selectedService}
          onSubmit={handlePutUpdateService}
          onClose={() => {
            setIsEditing(false);
            setSelectedService(null);
          }}
        />
      )}

      {isDeleting && (
        <Dialog
          open={isDeleting}
          header="Are you sure you want to delete this service?"
          onClose={() => {
            setSelectedService(null);
            setIsDeleting(false);
          }}
          onConfirm={handleDeleteService}
          closeBtnText={"Cancel"}
          confirmBtnText={"Delete"}
        />
      )}
    </div>
  );
};
