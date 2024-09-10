import { Axios } from "../../lib/axios";
import { IForgotPasswordrequestBody } from "./domain";
async function updateFotp(data: IForgotPasswordrequestBody) {
  try {
    let response: any = await Axios.post("/user/updatefotp", data);

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
          response.data.message ? response.data.message : `Failed to update otp`
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(`Failed to update otp`);
    }
  }
}

export { updateFotp };
