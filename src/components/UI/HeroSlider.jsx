import React, { useEffect, useState } from "react";
import Typewriter from "../UI/Typewriter";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";

import { apiGetHomeInfo } from "../../firebase/firestore/queries";

const HeroSlider = () => {
  const [homeInfo, setHomeInfo] = useState({});

  const handleGetHomeInfo = async () => {
    const response = await apiGetHomeInfo();
    setHomeInfo(response);
  };

  useEffect(() => {
    handleGetHomeInfo();
  }, []);

  return (
    <div className="hero__slider">
      <div
        className="slider__item"
        style={{
          backgroundImage: `linear-gradient(rgb(255, 255, 255), #47e4e4), url(${
            homeInfo?.homeBgImg || ""
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Container>
          <div className="slider__content">
            {homeInfo?.homeCarImg && (
              <img src={homeInfo?.homeCarImg || ""} className="image2" alt="" />
            )}

            <div className="parallelogram" />
            <div className="hero-content">
              <h1 className="text-light mb-1">
                <Typewriter text="Just" delay={300} />
              </h1>

              <h4 className="text-light mb-2">
                <Typewriter text="Rent A Car" delay={250} />
              </h4>
            </div>

            <div
              style={{ position: "absolute", top: 220, left: 480 }}
              className="button"
            >
              <button className="btn reserve__btn mt-2.5">
                <Link to="/fleet">Reserve Now</Link>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeroSlider;
