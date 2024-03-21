import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

const LoginDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Modal isOpen={open} toggle={() => setOpen(false)} centered>
      <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
        You must Login to rent a car
      </ModalHeader>
      <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          style={{ background: "#039594" }}
          onClick={() => navigate("/auth")}
        >
          Proceed
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginDialog;
