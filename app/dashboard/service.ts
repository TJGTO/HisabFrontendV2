import { Axios } from "../../lib/axios";

async function getConfigurations() {
  let response: any = await Axios.get("getconfigurations");

  if (response.data && response.data.success) {
    localStorage.setItem("bucketName", response.data.data.bucketName);
    localStorage.setItem(
      "profilePicturesFolder",
      response.data.data.profilePicturesFolder
    );
    localStorage.setItem(
      "paymentsPicturesFolder",
      response.data.data.paymentsPicturesFolder
    );

    return {
      success: true,
      message: "Successfull",
      userdata: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch the configurations"
    }`,
  };
}

export { getConfigurations };
