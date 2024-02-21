import { Console } from "console";
import { AxiosWithAuth, AxiosWithAuthFromData } from "../../lib/axios";
import { updateProfileObj, ISearchUserReqBody } from "./domain";

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
async function updateProfilePicture(data: FormData) {
  try {
    let response: any = await AxiosWithAuthFromData.patch(
      "user/userPrfoilePicture",
      data
    );

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
        response.data.message
          ? response.data.message
          : "Failed to Update profile picture"
      }`,
    };
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to Update profile picture");
    }
  }
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

  if (response.data && response.data.success) {
    if (response.data.data.profilePictureURL) {
      localStorage.setItem("profileURL", response.data.data.profilePictureURL);
    }
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
async function searchForPlayers(data: ISearchUserReqBody) {
  try {
    let response: any = await AxiosWithAuth.post("user/search", data);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Successfull",
        usersList: response.data.data,
      };
    }
    return {
      success: false,
      message: `${
        response.data.message ? response.data.message : "Failed to search users"
      }`,
    };
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to search users");
    }
  }
}
export {
  updateUser,
  getStates,
  getUserDetails,
  updateProfilePicture,
  searchForPlayers,
};
