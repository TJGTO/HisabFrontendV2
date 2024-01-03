import { Axios } from "../../lib/axios";
import { loginObj } from "./domain";

async function loginUser(data: loginObj) {
  let response: any = await Axios.post("user/login", data);

  if (response.data && response.data.success) {
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("fullname", response.data.data.fullname);
    localStorage.setItem("email", response.data.data.email);
    localStorage.setItem("profileURL", response.data.data.profilePictureUrl);

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
