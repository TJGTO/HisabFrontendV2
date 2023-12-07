import { Axios } from "../../lib/axios";
import { loginObj } from "./domain";

async function loginUser(data: loginObj) {
  let response: any = await Axios.post("user/login", data);

  if (response.data && response.data.success) {
    localStorage.setItem("token", response.data.data.token);
    return {
      success: true,
      message: "Login is successfull",
      userdata: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message ? response.data.message : "Login is failed"
    }`,
  };
}

export { loginUser };
