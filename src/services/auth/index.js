import { axiosBaseQuery } from "../axiosBaseQuery";

export const signIn = async ({ email, password }) => {
  try {
    const response = await axiosBaseQuery({
      url: "/users/signIn",
      method: "POST",
      data: { email, password },
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
  email,
  password,
}) => {
  try {
    const response = await axiosBaseQuery({
      url: "/users/signUp",
      method: "POST",
      data: { firstName, lastName, email, password },
      });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
