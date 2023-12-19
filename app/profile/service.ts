import { Console } from "console";
import { AxiosWithAuth } from "../../lib/axios";
import { updateProfileObj } from "./domain";

async function updateUser(data: updateProfileObj) {
  let response: any = await AxiosWithAuth.patch("user/update", data);

  if (response.data && response.data.success) {
    return {
      success: true,
      message: "Update is successfull",
      userdata: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message ? response.data.message : "Failed to Update"
    }`,
  };
}

async function getStates() {
  let response: any = await AxiosWithAuth.get("states");

  if (response.data && response.data.success) {
    return {
      success: true,
      states: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message ? response.data.message : "Failed to fetch states"
    }`,
  };
}

async function getUserDetails() {
  let response: any = await AxiosWithAuth.get("user/userdetails");
  console.log("fewgergh");
  if (response.data && response.data.success) {
    return {
      success: true,
      user: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch the user detail"
    }`,
  };
}
export { updateUser, getStates, getUserDetails };
