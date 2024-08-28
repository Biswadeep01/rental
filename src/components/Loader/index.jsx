import React from "react";
import { Container, Spinner } from "reactstrap";

export const Loader = () => {
  return (
    <Container fluid>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent backdrop
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Spinner color="light" size="lg" />
        </div>
      </div>
    </Container>
  );
};
