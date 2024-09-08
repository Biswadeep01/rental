import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Col } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import { useAppContext } from "../../context";
import "../../styles/booking-form.css";
import Stepper from "../../components/UI/Stepper";
import CarCatalog from "./CarCatalog";
import AdditionalOptions from "./AdditionalOptions";
import BookingForm from "./BookingForm";
import { useAppStore } from "../../store";
import { apiGetOptions } from "../../firebase/firestore/queries";
import { useLocation } from "react-router-dom";

const validationSchema = yup.object({
  firstName: yup.string().required("*required"),
  lastName: yup.string().required("*required"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    ),
  phoneNumber: yup.string().required("*required"),
  fromAddress: yup.string().required("*required"),
  toAddress: yup.string().required("*required"),
  pickupDate: yup.string().required("*required"),
  pickupTime: yup.string().required("*required"),
  returnDate: yup.string().required("*required"),
  returnTime: yup.string().required("*required"),
  message: yup.string(),
});

const BookingSection = () => {
  const { state: locationStateData } = useLocation();
  const { user } = useAppContext();
  const { car } = useAppStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [bookingObj, setBookingObj] = useState({});
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedPickUpDate =
    dayjs(locationStateData?.pickupDateTime?.split("T")[0])?.format(
      "YYYY-MM-DD"
    ) || dayjs(new Date()).format("YYYY-MM-DD");
  const selectedPickUpTime =
    locationStateData?.pickupDateTime?.split("T")[1] || "";
  const selectedReturnDate =
    dayjs(locationStateData?.returnDateTime?.split("T")[0]).format(
      "YYYY-MM-DD"
    ) || "";
  const selectedReturnTime =
    locationStateData?.returnDateTime?.split("T")[1] || "";

  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      fromAddress: "",
      toAddress: "",
      pickupDate: selectedPickUpDate,
      pickupTime: selectedPickUpTime,
      returnDate: selectedReturnDate,
      returnTime: selectedReturnTime,
      message: "",
      adult: car?.passengers?.adult || 0,
      child: car?.passengers?.child || 0,
      luggages: car.luggageCapacity,
      options: [],
    },
    onSubmit: (values) => {
      try {
        setOpen(true);
        setBookingObj({
          ...values,
          pricePerDay: car.pricePerDay,
          carId: car.id,
          userId: user.user.id,
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    },
  });

  const handleStepChange = (tempStep) => {
    setCurrentStep(tempStep);
  };

  const navObj = {
    1: <CarCatalog handleStepChange={handleStepChange} />,
    2: (
      <AdditionalOptions
        formik={formik}
        options={additionalOptions}
        handleStepChange={handleStepChange}
      />
    ),
    3: (
      <BookingForm
        formik={formik}
        bookingObj={bookingObj}
        open={open}
        setOpen={setOpen}
        loading={loading}
      />
    ),
  };

  const handleGetAdditionalOptions = async () => {
    const data = await apiGetOptions();
    if (data) {
      setAdditionalOptions(data.options);
    }
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      luggages: car.luggageCapacity,
      adult: car?.passengers?.adult || 0,
      child: car?.passengers?.child || 0,
    });
  }, [car]);

  useEffect(() => {
    handleGetAdditionalOptions();
  }, []);

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
          totalSteps={4}
          handleStepChange={handleStepChange}
        />

        {navObj[currentStep]}
      </Container>
    </>
  );
};

export default BookingSection;
