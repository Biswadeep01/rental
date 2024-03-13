import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const { id, imgUrl, person, carName, luggage, price } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            ${price}.00 <span>/ day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span
              className=" d-flex align-items-center gap-1"
              style={{ fontWeight: 500 }}
            >
              <i class="ri-team-line"></i> {person} Persons
            </span>
            
            <span
              className=" d-flex align-items-center gap-1"
              style={{ fontWeight: 500 }}
            >
              <i class="ri-suitcase-line"></i> {luggage} Luggages
            </span>
          </div>

          <Link to="/booking-form" state={{ data: props.item }}>
            <button className="w-100 car__item-btn car__btn-rent">Rent</button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
