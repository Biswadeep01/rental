import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import { apiGetAboutInfo } from "../../firebase/firestore/queries";

const AboutSection = ({ aboutClass }) => {
  const [aboutInfo, setAboutInfo] = useState({
    description: "",
    reasonsToChooseUs: [],
    image: "",
  });

  const { description, image } = aboutInfo;

  const handleGetAboutInfo = async () => {
    const response = await apiGetAboutInfo();
    setAboutInfo(response);
  };

  useEffect(() => {
    handleGetAboutInfo();
  }, []);

  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "200px" }
      }
    >
      <Container>
        <Row>
          <Col lg="7" md="6">
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
            </div>
          </Col>

          <Col lg="5" md="5">
            <div className="about__img">
              <img
                src={image || ""}
                alt=""
                className="w-100"
                style={{ marginTop: "80px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
