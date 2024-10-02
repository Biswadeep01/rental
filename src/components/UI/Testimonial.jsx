import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import { apiGetTestimonials } from "../../firebase/firestore/queries";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  const handleGetTestimonials = async () => {
    const data = await apiGetTestimonials();
    setTestimonials(data);
  };

  useEffect(() => {
    handleGetTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: testimonials.length > 1,
    speed: 500,
    slidesToShow: Math.min(testimonials.length, 3),
    slidesToScroll: Math.min(testimonials.length, 3),
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div style={{ width: "100%" }}>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index}>
              <div className="testimonial p-4">
                <p className="section__description">{item.description}</p>
                <div className="d-flex align-items-center">
                  <i class="ri-account-box-line ri-4x" />
                  <h6 className="m-1">{item.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
