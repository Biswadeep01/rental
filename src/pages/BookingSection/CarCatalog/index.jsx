import React, { useState } from "react";
import { Card, CardImgOverlay, CardText, CardTitle, Container, Row, Col, Spinner, Button} from "reactstrap";
import isEmpty from "lodash.isempty";
import CarItem from "../../../components/UI/CarSection/CarItem";
import "../../../styles/car-item.css";
import { useAppStore } from "../../../store";
import { useAppContext } from "../../../context";

const CarCatalog = ({ handleStepChange }) => {
  const { car, cars } = useAppStore();
  const [loading] = useState(false);

  return (
    <Container>
      {!isEmpty(car) && (
        <Container>
          <SelectedCar handleStepChange={handleStepChange} />
        </Container>
      )}

      {isEmpty(car) && (
        <h4 className="mx-3 my-2">Select a car for your ride</h4>
      )}

      <Container>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            {cars.length > 0 && (
              <Row>
                {cars?.slice(0, 6)?.map((item) => {
                  if (item.id !== car.id) {
                    return (
                      <Col key={item.id} lg="4" md="4" sm="6" className="mb-3">
                        <CarItem {...item} />
                      </Col>
                    );
                  }
                  return null;
                })}
              </Row>
            )}
          </>
        )}
      </Container>
    </Container>
  );
};

export default CarCatalog;

const SelectedCar = ({ handleStepChange }) => {
  // { model, pricePerDay, passengerCapacity, luggageCapacity }
  const { car } = useAppStore();
  const { user } = useAppContext();
  return (
    <div className="mb-4">
      <Card 
        className="my-2"
        color="dark"
        outline
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div>
            <img
              src={car.imageUrl}
              alt={car.model}
              style={{ width: 500, height: 300 }}
            />
          </div>
            <CardTitle tag="h4">
              {car.model}
            </CardTitle>
            <CardText>
              Price: ${car.pricePerDay}.00 <span>/ day</span>
            </CardText>
          <Button
            onClick={() => handleStepChange(2)}
            className="booking mt-2"
            style={{ width: "100%" }}
            disabled={!user.token}
          >
            Proceed
          </Button>
        </div>
      </Card>
    </div>
  );
};
