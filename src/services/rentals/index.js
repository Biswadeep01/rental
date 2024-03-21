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
