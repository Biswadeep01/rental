import React from "react";
import {useLocation} from "react-router-dom";
import Helmet from "../Helmet/Helmet";
import "../../styles/booking-form.css";
import { Container, Col, Form, FormGroup } from "reactstrap";

const BookingForm = (props) => {
  console.log(props, "props")
  const location = useLocation();
  const data = location.state?.data;
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Helmet title="Booking">
      <Container>
        <div className="booking__top d-flex align-items-center justify-content-between">
          <Col lg="12" className="text-center mb-5">Booking</Col>
        </div>
        <div>
          <p>Car ID: {data? data.id : null}</p>
        </div>
        <Form onSubmit={submitHandler}>
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" placeholder="First Name" />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input type="text" placeholder="Last Name" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="email" placeholder="Email" />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input type="number" placeholder="Phone Number" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="text" placeholder="From Address" />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input type="text" placeholder="To Address" />
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <select name="" id="person">
              <option value="1 person">1 Person</option>
              <option value="2 person">2 Person</option>
              <option value="3 person">3 Person</option>
              <option value="4 person">4 Person</option>
              <option value="5+ person">5+ Person</option>
            </select>
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <select name="" id="luggage">
              <option value="1 luggage">1 luggage</option>
              <option value="2 luggage">2 luggage</option>
              <option value="3 luggage">3 luggage</option>
              <option value="4 luggage">4 luggage</option>
              <option value="5+ luggage">5+ luggage</option>
            </select>
          </FormGroup>

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="date" placeholder="Journey Date" />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input
              type="time"
              placeholder="Journey Time"
              className="time__picker"
            />
          </FormGroup>

          <FormGroup>
            <textarea
              rows={5}
              type="textarea"
              className="textarea"
              placeholder="Write"
            ></textarea>
          </FormGroup>
        </Form>
      </Container>
    </Helmet>

  );
};

export default BookingForm;
