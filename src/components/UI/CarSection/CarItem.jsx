import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/car-item.css";
import { useAppStore } from "../../../store";
import { Button } from "reactstrap";
import { useAppContext } from "../../../context";
import LoginDialog from "../../LoginDialog";

const CarItem = ({
  id,
  model,
  pricePerDay,
  imageUrl,
  passengerCapacity,
  luggageCapacity,
  passengers = {
    adult: 0,
    child: 0,
  },
}) => {
  const navigate = useNavigate();
  const { fetchCar } = useAppStore();
  const { user } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleRedirection = (carId) => {
    fetchCar(carId);
    if (user.token) navigate("/booking-form");
    else setOpen(true);
  };

  return (
    <div className="car__item">
      <div className="car__img">
        <img
          src={imageUrl}
          alt={model}
          style={{ height: 150, width: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="car__item-content mt-4">
        <h4 className="section__title text-center">{model}</h4>
        <h6 className="rent__price text-center mt-">
          ${pricePerDay}.00 <span>/ day</span>
        </h6>
        <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-1">
          <span
            className=" d-flex align-items-center gap-1"
            style={{ fontWeight: 500 }}
          >
            <i class="ri-team-line" /> {passengerCapacity} Persons (
            {passengers.adult} Adult {passengers.child} Child)
          </span>

          <span
            className=" d-flex align-items-center gap-1"
            style={{ fontWeight: 500 }}
          >
            <i class="ri-suitcase-line" /> {luggageCapacity} Luggages
          </span>
        </div>
      </div>

      <div>
        <Button
          className="booking"
          style={{ width: "100%" }}
          onClick={() => handleRedirection(id)}
        >
          Rent
        </Button>
      </div>
      {open && <LoginDialog open={open} setOpen={setOpen} />}
    </div>
  );
};

export default CarItem;
