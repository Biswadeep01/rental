import React, { useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import CarItem from "./CarItem";
import { useAppStore } from "../../../store";

const CarSection = () => {
  const [loading] = useState(false);
  const { cars } = useAppStore();

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h6 className="section__subtitle">Come with</h6>
            <h2 className="section__title">Offers</h2>
          </Col>
        </Row>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            {cars && cars.length > 0 && (
              <Row>
                {cars?.slice(0, 6)?.map((item) => (
                  <Col key={item.id} lg="4" md="4" sm="6" className="mb-3">
                    <CarItem {...item} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default CarSection;
