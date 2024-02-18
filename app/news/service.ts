import { createNewsReqBody } from "./domain";
import { AxiosWithAuth, Axios, AxiosWithAuthFromData } from "../../lib/axios";

async function createNews(data: createNewsReqBody) {
  try {
    let response: any = await AxiosWithAuth.post("article/create", data);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Airticle is created",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        data: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to create the Airticle"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to create the Airticle");
    }
  }
}

async function getActiveNews() {
  try {
    let response: any = await Axios.get("article/allArticles");

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Successfully fetched",
        newsData: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to fetch the articles"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch the articles");
    }
  }
}
<<<<<<< HEAD
async function getNewsDetails(newsId: string) {
  try {
    let response: any = await Axios.get(`article/allArticles/${newsId}`);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Successfully fetched",
        airticle: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to fetch the article details"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch the articledetails");
    }
  }
}
export { createNews, getActiveNews, getNewsDetails };
=======
export { createNews, getActiveNews };
>>>>>>> 43ee4b9814c1a795ff20a2401508a69b291cce52
