import { createNewsReqBody, IPostCommentReqBody } from "./domain";
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
async function getComments(newsId: string) {
  try {
    let response: any = await Axios.get(`article/comments/${newsId}`);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Successfully fetched",
        comments: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to fetch the comments"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch the comments");
    }
  }
}
async function postComments(reqbody: IPostCommentReqBody) {
  try {
    let response: any = await AxiosWithAuth.post(
      `article/updateComment`,
      reqbody
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Successfully updated",
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to update the comment"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch the comments");
    }
  }
}
export { createNews, getActiveNews, getNewsDetails, getComments, postComments };
