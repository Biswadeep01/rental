import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Helmet } from "react-helmet-async";
import isEmpty from "lodash.isempty";
// import OurMembers from "../components/UI/OurMembers";
import "../styles/about-section.css";
import { apiGetAboutInfo } from "../firebase/firestore/queries";

const About = () => {
  const [aboutInfo, setAboutInfo] = useState({
    description: "",
    reasonsToChooseUs: [],
    image: "",
  });

  const { description, reasonsToChooseUs, image } = aboutInfo;

  const handleGetAboutInfo = async () => {
    const response = await apiGetAboutInfo();
    setAboutInfo(response);
  };

  useEffect(() => {
    handleGetAboutInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title> Just Rent a Car | About </title>
      </Helmet>

      <Container className="my-5">
        <Row>
          <Col lg="7" md="7">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to car rent service</h2>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  marginTop: 16,
                  textAlign: "justify",
                }}
              >
                {description || ""}
              </p>

              <br />

              {isEmpty(reasonsToChooseUs) ? null : (
                <>
                  <h4 className="section__subtitle">Why Choose us?</h4>

                  <div style={{ marginTop: 16 }}>
                    {reasonsToChooseUs?.map((reason, index) => (
                      <p
                        className="d-flex align-items-center gap-2"
                        key={index}
                      >
                        <i className="ri-checkbox-circle-line" /> {reason}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Col>

          <Col lg="5" md="5">
            <div className="about__img">
              <img
                src={image || ""}
                alt=""
                className="w-100"
                style={{ marginTop: "50px" }}
              />
            </div>
          </Col>
        </Row>

        {/* <Col lg="12" md="12" className="text-center mb-5">
          <h1
            className="section__subtitle member"
            style={{ textAlign: "center" }}
          >
            Our Members
          </h1>
          <OurMembers />
        </Col> */}
      </Container>
    </>
  );
};

export default About;
