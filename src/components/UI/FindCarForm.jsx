import React from "react";
import { Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/find-car-form.css";

const FindCarForm = () => {
  return (
    <Form className="form">
      <h3> Find your best car here </h3>
      <div
        style={{ marginTop: "1rem" }}
        className="d-flex align-items-center justify-content-between flex-wrap"
      >
        <FormGroup className="form__group">
          <label>Pick Up Date</label>
          <input type="date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <label>Pick Up Time</label>
          <input type="time" placeholder="" required />
        </FormGroup>

        <FormGroup className="form__group">
          <label>Return Date</label>
          <input type="date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <label>Return time</label>
          <input type="time" required />
        </FormGroup>

        <FormGroup className="form__group">
          <label>Promo Code</label>
          <input type="text" placeholder="xxx-yyy-zzz" />
        </FormGroup>

        <FormGroup className="form__group">
          <Link to="/fleet">
            <button className="btn find__car-btn">Find Car</button>
          </Link>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
