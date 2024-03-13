import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../../styles/booking-form.css";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Button,
  Row,
  Label,
  Input,
} from "reactstrap";

const options = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: ">5", value: ">5" },
];

const BookingForm = (props) => {
  const location = useLocation();
  const data = location.state?.data;
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* <div>
          <p>Car ID: {data? data.id : null}</p>
          <p>Car Name: {data? data.name : null}</p>
        </div> */}
      <Helmet>
        <title> Just Rent a Car | Book a ride </title>
      </Helmet>
      <Container>
        <Col lg="12" className="text-left my-5">
          <h2 className="section__title" style={{ color: "black" }}>
            Let's book a ride 🚘{" "}
          </h2>
        </Col>

        <Form onSubmit={submitHandler}>
          <Row style={{ rowGap: 15 }}>
            <Col md="6">
              <Label>First Name</Label>
              <Input placeholder="John" />
            </Col>
            <Col md="6">
              <Label>Last Name</Label>
              <Input placeholder="Doe" />
            </Col>
            <Col md="6">
              <Label>Email</Label>
              <Input placeholder="johndoe@email.com" />
            </Col>
            <Col md="6">
              <Label>Phone Number</Label>
              <Input placeholder="9988776655" />
            </Col>
            <Col md="6">
              <Label>From Address</Label>
              <Input type="textarea" style={{ height: "5rem" }} />
            </Col>
            <Col md="6">
              <Label>To Address</Label>
              <Input type="textarea" style={{ height: "5rem" }} />
            </Col>
            <Col md="6">
              <FormGroup col>
                <Label for="exampleSelect">Choose number of passengers</Label>
                <Col>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    style={{ height: "3rem" }}
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
                <Label for="exampleSelect">Choose number of luggages</Label>
                <Col>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    style={{ height: "3rem" }}
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
                  <Input type="date" style={{ height: "3rem" }} />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup col>
                <Label>Journey Time</Label>
                <Col>
                  <Input type="time" style={{ height: "3rem" }} />
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
                    style={{ height: "5rem" }}
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="12">
              <Button className="booking" style={{ width: "100%" }}>
                Confirm details
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default BookingForm;
