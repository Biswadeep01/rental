import React from "react";
import "./index.css";

export const Counter = ({
  value = 0,
  onIncrement = () => {},
  onDecrement = () => {},
}) => (
  <div className="counter-container">
    <button type="button" className="counter-button" onClick={onDecrement}>
      -
    </button>
    <div className="counter-value">{value}</div>
    <button type="button" className="counter-button" onClick={onIncrement}>
      +
    </button>
  </div>
);
