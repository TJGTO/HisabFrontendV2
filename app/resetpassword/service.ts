import { Axios } from "../../lib/axios";
import { IChangePasswordrequestBody } from "./domain";
async function changePassword(data: IChangePasswordrequestBody) {
  try {
    let response: any = await Axios.post("/user/changePassword", data);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.message
            ? response.data.message
            : `Failed to update new password`
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(`Failed to update new password`);
    }
  }
}

export { changePassword };
