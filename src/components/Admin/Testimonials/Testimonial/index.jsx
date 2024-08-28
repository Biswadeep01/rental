import React from "react";
import { Card, CardBody, CardText, CardTitle, Media } from "reactstrap";
import dayjs from "dayjs";
import { trimText } from "../../../../utils";

export const Testimonial = ({ name, description, createdAt, onDelete }) => {
  return (
    <Card className="h-100" style={{ borderRadius: 10 }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <div
            style={{
              background: "#ef233c",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
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

      <CardBody>
        <Media>
          <div className="d-flex align-items-center justify-content-center">
            <i
              class="ri-account-circle-line ri-5x"
              style={{ color: "#039594" }}
            />
          </div>

          <Media body>
            <CardTitle tag="h5" className="mb-2 mt-3">
              {name}
            </CardTitle>

            <CardText style={{ fontSize: 14 }}>
              {trimText(description, 250)}
            </CardText>
          </Media>
        </Media>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            paddingTop: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <i class="ri-calendar-line spec-item-icon" />
            <span>{dayjs(createdAt).format("DD-MM-YYYY")}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <i class="ri-time-line spec-item-icon" />
            <span>{dayjs(createdAt).format("hh:mm A")}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
