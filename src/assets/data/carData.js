// import all images from assets/images directory
import img01 from "../all-images/cars-img/compact.png";
import img02 from "../all-images/cars-img/standard.png";
import img03 from "../all-images/cars-img/mid-suv.png";
import img04 from "../all-images/cars-img/full-suv.png";
import img05 from "../all-images/cars-img/luxury-sedan.png";
import img06 from "../all-images/cars-img/luxury-suv.png";

const carData = [
  {
    id: 1,
    carName: "Compact",
    imgUrl: img01,
    person: "4",
    price: 40,
    luggage: "2"
  },

  {
    id: 2,
    carName: "Standard",
    imgUrl: img02,
    person: "5",
    price: 50,
    luggage: "2",
  },

  {
    id: 3,
    carName: "Mid-Size SUV",
    imgUrl: img03,
    person: "5",
    price: 65,
    luggage: "3",
  },

  {
    id: 4,
    carName: "Full-Size SUV",
    imgUrl: img04,
    person: "7",
    price: 70,
    luggage: "2",
  },
  {
    id: 5,
    carName: "Luxury Sedan",
    imgUrl: img05,
    person: "4",
    price: 80,
    luggage: "2",
  },
  {
    id: 6,
    carName: "Luxury SUV",
    imgUrl: img06,
    person: "5",
    price: 90,
    luggage: "2",
  },

];

export default carData;
