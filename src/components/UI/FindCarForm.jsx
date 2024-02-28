import React from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
      <FormGroup className="form__group">Pick Up Date
          <input type="date" placeholder="Pick Up Date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="pickup__time"
            type="time"
            placeholder="Pick Up Time"
            required
          />
        </FormGroup>

        <FormGroup className="form__group">Return Date
          <input type="date" placeholder="Return date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="return__time"
            type="time"
            placeholder="Return time"
            required
          />
        </FormGroup>
        <FormGroup className="form__group">
          <input type="text" placeholder="Promo Code"/>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
