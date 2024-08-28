import React from "react";
import "./index.css";

export const CarItem = ({
  model,
  pricePerDay,
  imageUrl,
  luggageCapacity,
  passengers = {
    adult: 0,
    child: 0,
  },
  onSelect,
  onDelete,
}) => (
  <div className="car-item">
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 4, right: 4 }}>
        <div
          style={{
            background: "#ef233c",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: 4,
            width: 32,
            height: 32,
            borderRadius: 8,
          }}
        >
          <i
            class="ri-delete-bin-line"
            style={{ color: "#ffffff" }}
            onClick={onDelete}
          />
        </div>
      </div>
    </div>

    <div onClick={onSelect}>
      <img src={imageUrl} alt={model} className="car-image" />

      <div className="car-details">
        <h4 className="car-model">{model}</h4>

        <p className="car-price">
          <span className="price-value">$&nbsp;{pricePerDay}.00</span> /day
        </p>

        <div className="car-specs">
          <span className="spec-item">
            <i className="ri-team-line spec-item-icon" /> {passengers.adult}{" "}
            Adult
          </span>

          <span className="spec-item">
            <i className="ri-team-line spec-item-icon" /> {passengers.child}{" "}
            Child
          </span>

          <span className="spec-item">
            <i className="ri-suitcase-line spec-item-icon" /> {luggageCapacity}{" "}
            Luggages
          </span>
        </div>
      </div>
    </div>
  </div>
);
