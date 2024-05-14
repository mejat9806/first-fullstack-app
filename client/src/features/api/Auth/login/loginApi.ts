import axios from "axios";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );

    // Check if the response contains any error
    if (response.data.error) {
      // If there's an error, throw it so that it can be caught in the calling function
      throw new Error(response.data.error);
    }

    // Return the response data
    return response.data;
  } catch (error) {
    // If there's an error, log it
    console.log(error);
    // Re-throw the error so that it can be caught in the calling function
    throw error;
  }
};
