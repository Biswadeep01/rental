import { axiosBaseQuery } from "../axiosBaseQuery";

export const getAllCars = async () => {
  try {
    const response = await axiosBaseQuery({
      url: "/cars",
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

export const getCarById = async ({ id }) => {
  try {
    const response = await axiosBaseQuery({
      url: `/cars/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};
