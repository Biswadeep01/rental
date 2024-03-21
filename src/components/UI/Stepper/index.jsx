import React from "react";
import "./stepper.css";
import { Container } from "reactstrap";

const Stepper = ({
  currentStep,
  completedSteps = [],
  totalSteps,
  handleStepChange,
}) => {
  return (
    <Container className="px-3 my-3">
      <div className="stepper">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`step ${currentStep === index + 1 && "active"}`}
              onClick={() => handleStepChange(index + 1)}
            >
              {completedSteps.includes(index + 1) ? (
                <i class="ri-check-fill" />
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && <div className="divider" />}
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};

export default Stepper;
