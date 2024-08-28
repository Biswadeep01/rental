import React from "react";
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";

export const Service = ({ title, description, onDelete, onSelect }) => {
  return (
    <Card style={{ height: 200, cursor: "pointer" }}>
      <div style={{ position: "relative" }}>
        <div
          style={{ position: "absolute", top: 8, right: 8 }}
          onClick={onDelete}
        >
          <div
            style={{
              background: "#ef233c",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              padding: 4,
              width: 32,
              height: 32,
              borderRadius: 8,
            }}
          >
            <i
              class="ri-delete-bin-line"
              style={{ color: "#ffffff" }}
              onClick={onDelete}
            />
          </div>
        </div>
      </div>

      <CardBody onClick={onSelect}>
        {/* {icon && <div className="mb-3">{icon}</div>} */}
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
};
