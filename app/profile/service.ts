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

export { updateUser };
