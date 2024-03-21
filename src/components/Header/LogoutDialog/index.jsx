import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

const LogoutDialog = ({ open, setOpen, handleLogout }) => (
  <Modal isOpen={open} toggle={() => setOpen(false)} centered>
    <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
      Are you sure to logout?
    </ModalHeader>
    <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button style={{ background: "#039594" }} onClick={() => handleLogout()}>
        Logout
      </Button>
    </ModalFooter>
  </Modal>
);

export default LogoutDialog;
