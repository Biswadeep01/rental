import React from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";

export const Dialog = ({
  open,
  header,
  message,
  onConfirm,
  onClose,
  closeBtnText,
  confirmBtnText,
}) => (
  <Modal isOpen={open} toggle={onClose} centered>
    <ModalHeader style={{ display: "flex", justifyContent: "center" }}>
      {header}
    </ModalHeader>
    {message && (
      <ModalBody style={{ textAlign: "center" }}>{message}</ModalBody>
    )}
    <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={onClose}>{closeBtnText}</Button>
      <Button style={{ background: "#039594" }} onClick={onConfirm}>
        {confirmBtnText}
      </Button>
    </ModalFooter>
  </Modal>
);
