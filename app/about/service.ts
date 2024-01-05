import { Axios } from "../../lib/axios";

async function getAboutUsData() {
  let response: any = await Axios.get("aboutus");

  if (response.data && response.data.success) {
    return {
      success: true,
      message: "Fetching Successfull",
      data: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch the aboutus"
    }`,
  };
}

export { getAboutUsData };
