import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Spinner,
  Col,
  Row,
  Toast,
  ToastBody,
} from "reactstrap";
import dayjs from "dayjs";

function InfoTableDialog({
  loading,
  open,
  setOpen,
  data,
  handleConfirmation,
  message,
  setMessage,
}) {
  return (
    <Modal isOpen={open} centered>
      <ModalHeader toggle={() => setOpen(false)}>Confirm detials</ModalHeader>
      {message.text && (
        <Row className="mt-2">
          <Col md={"12"} style={{ display: "flex", justifyContent: "center" }}>
            <Toast
              className={`bg-${
                message.type === "success" ? "success" : "danger"
              } rounded`}
              style={styles.messageContainer}
            >
              <ToastBody style={styles.messsage}>{message.text}</ToastBody>
              <i
                class="ri-close-circle-fill ri-lg"
                style={{ color: "white" }}
                onClick={() => setMessage({ type: "", text: "" })}
              />
            </Toast>
          </Col>
        </Row>
      )}

      <div className="table-responsive">
        <ModalBody>
          <Table bordered>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>First Name</td>
                <td>{data.firstName}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Last Name</td>
                <td>{data.lastName}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Phone Number</td>
                <td>{data.phoneNumber}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Email</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>From</td>
                <td>{data.fromAddress}</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>To</td>
                <td>{data.toAddress}</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Pickup Details</td>
                <td>
                  {dayjs(data.pickupDate).format("DD-MM-YYYY")} |{" "}
                  {data.pickupTime}
                </td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Return Details</td>
                <td>
                  {dayjs(data.returnDate).format("DD-MM-YYYY")} |{" "}
                  {data.returnTime}
                </td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Passengers</td>
                <td>{data.passengers}</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>Luggages</td>
                <td>{data.luggages}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
      </div>

      <ModalFooter>
        <Button color="primary" onClick={handleConfirmation} disabled={loading}>
          {loading ? (
            <Spinner style={{ color: "#e9ecef" }} />
          ) : (
            <div>Confirm</div>
          )}
        </Button>
        <Button color="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default InfoTableDialog;

const styles = {
  messageContainer: {
    width: "95%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
  },
  messsage: {
    color: "#FFFFFF",
  },
};
