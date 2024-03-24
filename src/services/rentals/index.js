import { axiosBaseQuery } from "../axiosBaseQuery";

export const bookRide = async (bookingData) => {
  try {
    const response = await axiosBaseQuery({
      url: "/rentals/bookRide",
      method: "POST",
      data: bookingData,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export const isCarAvailable = async ({
  carId,
  pickupDateTime,
  returnDateTime,
}) => {
  try {
    const response = await axiosBaseQuery({
      url: "/rentals/isCarAvailable",
      method: "POST",
      data: { carId, pickupDateTime, returnDateTime },
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export const getAvailableCars = async ({ pickupDateTime, returnDateTime }) => {
  try {
    const response = await axiosBaseQuery({
      url: "/rentals/getAvailableCars",
      method: "POST",
      data: { pickupDateTime, returnDateTime },
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
