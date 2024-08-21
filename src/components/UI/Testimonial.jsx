import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";
import ava03 from "../../assets/all-images/ava-3.jpg";
import ava04 from "../../assets/all-images/ava-4.jpg";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  swipeToSlide: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonial = () => {
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
        We had a great experience. They picked us up promptly at the airport, the rental procedure was easy and no surprises. 
        We rented a 4 door Jeep that was brand new and worked out great for us. The car return was also very easy. 
        All of the staff were terrific.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Betsy T.</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        Renting from Just Rent-A-Car was part of the Virgin Island vacation which was very easy. 
        They picked us up on arrival and shuttle us back on departure. 
        Not to mention how informative and enthusiastic they were. 
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Berneta A.</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        GREAT, customer service. Definitely will be renting from them again. 
        Even gave us a ride to the airport after we returned the car!!!
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">E. G.</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        We had a great experience with JUST RENT A CAR during a recent visit to St. Thomas! 
        We rented a Jeep for 9-days. When we arrived at the airport, we called them to let them know. 
        They were there to pick us up in the Jeep in under 10-minutes. 
        The vehicle was spotlessly clean and they did a good job of noting all the nicks and dings so there wouldn’t be any question when we returned it at the end of the week.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Taryn R.</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        We had a great experience with JUST RENT A CAR and will definitely use them again when we return to the Virgin Islands. 
        I’ve already recommended this rental company to two people planning USVI vacations, and will continue to spread the word. 
        Thank you June and everyone else at JUST RENT A CAR!
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Kate M.</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
