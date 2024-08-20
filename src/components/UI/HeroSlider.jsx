import React from "react";
import image1 from "../../assets/all-images/hero/BMW.png";
import image2 from "../../assets/all-images/home.png";
import Typewriter from "../UI/Typewriter";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";

const HeroSlider = () => {
  return (
    <div className="hero__slider">
      <div className="slider__item">
        <Container>
          <div className="slider__content">
            <img src={image2} className="image2" alt="" />
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
