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

export const apiPostAddModel = async ({
  model,
  pricePerDay,
  imageUrl,
  luggageCapacity,
  passengers,
  passengerCapacity,
  totalCount,
}) => {
  try {
    const response = await axiosBaseQuery({
      url: "/cars",
      method: "POST",
      data: {
        model,
        pricePerDay,
        imageUrl,
        luggageCapacity,
        passengers,
        passengerCapacity,
        totalCount,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const apiPutUpdateModel = async ({
  id,
  model,
  pricePerDay,
  imageUrl,
  luggageCapacity,
  passengers,
  totalCount,
}) => {
  try {
    const response = await axiosBaseQuery({
      url: `/cars/${id}`,
      method: "PUT",
      data: {
        model,
        pricePerDay,
        imageUrl,
        luggageCapacity,
        passengers,
        totalCount,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const apiDeleteModel = async ({ id }) => {
  try {
    const response = await axiosBaseQuery({
      url: `/cars/${id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
