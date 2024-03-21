import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Container, Col } from "reactstrap";
import { useAppContext } from "../../context";
import "../../styles/booking-form.css";
import Stepper from "../../components/UI/Stepper";
import CarCatalog from "./CarCatalog";
import BookingForm from "./BookingForm";

const BookingSection = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStepChange = (tempStep) => {
    setCurrentStep(tempStep);
  };

  const navObj = {
    1: <CarCatalog handleStepChange={handleStepChange} />,
    2: <BookingForm />,
  };

  useEffect(() => {
    if (!user.token) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title> Just Rent a Car | Book a ride </title>
      </Helmet>

      <Container>
        <Col lg="12" className="text-left mt-5">
          <h2 className="section__title" style={{ color: "black" }}>
            Let's book a ride 🚘
          </h2>
        </Col>

        <Stepper
          completedSteps={completedSteps}
          currentStep={currentStep}
          totalSteps={3}
          handleStepChange={handleStepChange}
        />

        {!user.token && (
          <Container>
            <Alert color="danger">
              You must <b>Login</b> first to book ride.{" "}
              <Link to="/auth">Click here</Link>
            </Alert>
          </Container>
        )}

        {navObj[currentStep]}
      </Container>
    </>
  );
};

export default BookingSection;
