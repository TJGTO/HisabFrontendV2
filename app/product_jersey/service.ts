import { Axios, AxiosWithAuthFromData } from "../../lib/axios";
import {
  IJerseyRemoteConfig,
  IJerseyOrderPayload,
  IJerseyUploadedScreenshot,
} from "./domain";

async function getJerseyConfig() {
  let response: any = await Axios.get("config/jerseyconfig");

  if (response.data && response.data.success && response.data.data) {
    return {
      success: true,
      config: response.data.data.config as IJerseyRemoteConfig,
    };
  }
  return {
    success: false,
    message: `${response.data?.message}`,
  };
}

async function createJerseyOrder(payload: IJerseyOrderPayload) {
  let response: any = await Axios.post("jerseyorder/create", payload);

  if (response.data && response.data.success) {
    return {
      success: true,
      order: response.data.data,
    };
  }
  return {
    success: false,
    message: `${response.data?.message}`,
  };
}

async function uploadJerseyScreenshot(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  let response: any = await AxiosWithAuthFromData.post(
    "jerseyorder/uploadscreenshot",
    formData
  );

  if (response.data && response.data.success) {
    return {
      success: true,
      screenshot: response.data.data as IJerseyUploadedScreenshot,
    };
  }
  return {
    success: false,
    message: `${response.data?.message}`,
  };
}

export { getJerseyConfig, createJerseyOrder, uploadJerseyScreenshot };
