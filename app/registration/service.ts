import { Axios } from "../../lib/axios";
import { registrationObj } from "./domain";

async function registerUser(data: registrationObj) {
  let response: any = await Axios.post("user/create", data);

  if (response.data && response.data.success) {
    return { success: true, message: "Registration is successfull" };
  }
  return {
    success: false,
    message: response.data ? response.data.message : "Failed to register",
  };
}

export { registerUser };
