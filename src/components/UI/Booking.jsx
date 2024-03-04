import React from "react";
import Helmet from "../Helmet/Helmet";
import { Container } from "reactstrap";
import BookingForm from "../UI/BookingForm";
import PaymentMethod from "../UI/PaymentMethod";
const Booking = () => {
    return (
        <Helmet title="Booking">
            <Container>
                <div className="booking__top d-flex align-items-center justify-content-between">
                    <h1>Booking</h1>
                </div>
                <BookingForm />
                <PaymentMethod />
            </Container>
        </Helmet>
    
    );
};

export default Booking;