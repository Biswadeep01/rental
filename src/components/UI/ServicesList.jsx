import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import isEmpty from "lodash.isempty";
import { apiGetServices } from "../../firebase/firestore/queries";
import "../../styles/services-list.css";

const ServiceItem = ({ item }) => (
  <Col lg="4" md="4" sm="6" className="mb-4 px-4">
    <div className="service__item">
      <span className="mb-3 d-inline-block">
        <i class="ri-magic-line" />
      </span>
      <h6>{item.title}</h6>
      <p style={{ textAlign: "justify" }}>{item.description}</p>
    </div>
  </Col>
);

const ServicesList = () => {
  const [services, setServices] = useState([]);

  const handleGetServices = async () => {
    const data = await apiGetServices();
    setServices(data);
  };

  useEffect(() => {
    handleGetServices();
  }, []);

  return (
    <>
      {!isEmpty(services) && (
        <Row>
          {services.map((item) => (
            <ServiceItem item={item} key={item.id} />
          ))}
        </Row>
      )}

      {isEmpty(services) && (
        <Col lg="12" className="text-center">
          <h6 className="section__subtitle">No services found</h6>
        </Col>
      )}
    </>
  );
};

export default ServicesList;
