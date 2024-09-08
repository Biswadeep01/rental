import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Container,
  Col,
  Form,
  FormText,
  FormGroup,
  Button,
  Row,
  Label,
  Input,
} from "reactstrap";
import "../../../styles/booking-form.css";
import { bookRide, isCarAvailable } from "../../../services/rentals";
import { useAppStore } from "../../../store";
import InfoTableDialog from "../InfoTable";

const options = [
  { label: "0", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: ">5", value: ">5" },
];

const BookingForm = ({ formik, bookingObj, open, setOpen, loading }) => {
  const { car } = useAppStore();

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleConfirmation = async () => {
    const { pickupDate, pickupTime, returnDate, returnTime } = bookingObj;
    const pickupDateTime = `${pickupDate}T${pickupTime}:00`;
    const returnDateTime = `${returnDate}T${returnTime}:00`;
    const response = await isCarAvailable({
      carId: car.id,
      pickupDateTime,
      returnDateTime,
    });
    if (response.message === "Car available") {
      await bookRide({
        ...bookingObj,
        options: formik.values.options,
        carId: car.id,
      });
      setMessage({ type: "success", text: "Thank You! Ride confirmed" });
      setTimeout(() => {
        setOpen(false);
        formik.handleReset();
      }, 1500);
    } else {
      setMessage({ type: "error", text: "Sorry! This car is not available" });
    }
  };

  return (
    <Container className="my-5">
      <Form onSubmit={formik.handleSubmit}>
        <Row style={{ rowGap: 15 }}>
          <Col md="6">
            <Label>First Name</Label>
            <Input
              placeholder="John"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors.firstName) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.firstName}
              </FormText>
            )}
          </Col>
          <Col md="6">
            <Label>Last Name</Label>
            <Input
              placeholder="Doe"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors.lastName) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.lastName}
              </FormText>
            )}
          </Col>
          <Col md="6">
            <Label>Email</Label>
            <Input
              placeholder="johndoe@email.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors.email) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.email}
              </FormText>
            )}
          </Col>
          <Col md="6">
            <Label>Phone Number</Label>
            <Input
              placeholder="9988776655"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors.phoneNumber) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.phoneNumber}
              </FormText>
            )}
          </Col>
          <Col md="6">
            <Label>From Address</Label>
            <Input
              type="textarea"
              style={{ height: "5rem" }}
              name="fromAddress"
              value={formik.values.fromAddress}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors.fromAddress) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.fromAddress}
              </FormText>
            )}
          </Col>
          <Col md="6">
            <Label>To Address</Label>
            <Input
              type="textarea"
              style={{ height: "5rem" }}
              name="toAddress"
              value={formik.values.toAddress}
              onChange={formik.handleChange}
            />
            {Boolean(formik.errors.toAddress) && (
              <FormText style={styles.helperText} color={"#c1121f"}>
                {formik.errors.toAddress}
              </FormText>
            )}
          </Col>
          <Col md="6">
            <FormGroup col>
              <Label>Adult</Label>
              <Col>
                <Input
                  type="select"
                  name="adult"
                  value={formik.values.adult}
                  onChange={formik.handleChange}
                  style={{ height: "3rem" }}
                  disabled
                >
                  {options.map((op) => (
                    <option value={op.value}>{op.label}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup col>
              <Label>Child</Label>
              <Col>
                <Input
                  type="select"
                  name="child"
                  value={formik.values.child}
                  onChange={formik.handleChange}
                  style={{ height: "3rem" }}
                  disabled
                >
                  {options.map((op) => (
                    <option value={op.value}>{op.label}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup col>
              <Label>Luggages</Label>
              <Col>
                <Input
                  type="select"
                  name="luggages"
                  value={formik.values.luggages}
                  onChange={formik.handleChange}
                  style={{ height: "3rem" }}
                  disabled
                >
                  {options.map((op) => (
                    <option value={op.value}>{op.label}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup col>
              <Label>Journey Date</Label>
              <Col>
                <Input
                  type="date"
                  name="pickupDate"
                  min={dayjs(new Date()).format("YYYY-MM-DD")}
                  value={formik.values.pickupDate}
                  onChange={formik.handleChange}
                  style={{ height: "3rem" }}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup col>
              <Label>Journey Time</Label>
              <Col>
                <Input
                  type="time"
                  name="pickupTime"
                  value={formik.values.pickupTime}
                  onChange={formik.handleChange}
                  style={{ height: "3rem" }}
                />
                {Boolean(formik.errors.pickupTime) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.pickupTime}
                  </FormText>
                )}
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup col>
              <Label>Return Date</Label>
              <Col>
                <Input
                  type="date"
                  name="returnDate"
                  min={formik.values.pickupDate}
                  value={formik.values.returnDate}
                  onChange={formik.handleChange}
                  style={{ height: "3rem" }}
                />
                {Boolean(formik.errors.returnDate) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.returnDate}
                  </FormText>
                )}
              </Col>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup col>
              <Label>Return Time</Label>
              <Col>
                <Input
                  type="time"
                  name="returnTime"
                  value={formik.values.returnTime}
                  onChange={formik.handleChange}
                  style={{ height: "3rem" }}
                />
                {Boolean(formik.errors.returnTime) && (
                  <FormText style={styles.helperText} color={"#c1121f"}>
                    {formik.errors.returnTime}
                  </FormText>
                )}
              </Col>
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup col>
              <Label>Message</Label>
              <Col>
                <Input
                  placeholder="Your message..."
                  type="textarea"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  style={{ height: "5rem" }}
                />
              </Col>
            </FormGroup>
          </Col>

          <Col md="12">
            <Button type="submit" className="booking" style={{ width: "100%" }}>
              Confirm details
            </Button>
          </Col>
        </Row>
      </Form>

      {open && (
        <InfoTableDialog
          loading={loading}
          open={open}
          setOpen={setOpen}
          data={{ ...bookingObj, options: formik.values.options }}
          handleConfirmation={handleConfirmation}
          message={message}
          setMessage={setMessage}
        />
      )}
    </Container>
  );
};

export default BookingForm;

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  signInBtn: {
    background: "#039594",
  },
  bottomText: {
    fontSize: 15,
    marginTop: "0.5rem",
    cursor: "pointer",
  },
  title: {
    fontWeight: 600,
    marginTop: "2.5rem",
    textAlign: "center",
  },
  helperText: {
    marginLeft: 10,
    color: "#c1121f",
    fontSize: 12,
  },
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
