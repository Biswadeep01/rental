import { axiosBaseQuery } from "../axiosBaseQuery";

export const signIn = async ({ phoneNumber, password }) => {
  try {
    const response = await axiosBaseQuery({
      url: "/users/signin",
      method: "POST",
      data: { phoneNumber, password },
    });
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export const signUp = async ({
  firstName,
  lastName,
  phoneNumber,
  password,
}) => {
  try {
    const response = await axiosBaseQuery({
      url: "/users/signup",
      method: "POST",
      data: { firstName, lastName, phoneNumber, password },
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
