import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNewsReqBody, IAirticleState } from "../../app/news/domain";

import {
  createNews,
  getComments,
  getActiveNews,
  getNewsDetails,
  getPermissionMatrix,
} from "../../app/news/service";

const initialState: IAirticleState = {
  AirticleLoader: false,
  AirticleMessage: "",
  AirticleFlag: "",
  activeAirticles: [],
  comments: [],
  currentAirticleDetail: null,
  permissions: {
    editArticle: false,
    approveOrReject: false,
  },
};

export const createTheNews = createAsyncThunk(
  "airticleModel/createNews",
  async (data: createNewsReqBody, { getState, dispatch }) => {
    try {
      const response = await createNews(data);
      dispatch(fetchActiveNews());
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const fetchPermissions = createAsyncThunk(
  "airticleModel/fetchPermissions",
  async (newsId: string) => {
    try {
      const response = await getPermissionMatrix(newsId);
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const fetchActiveNews = createAsyncThunk(
  "airticleModel/fetchActiveArticles",
  async () => {
    try {
      const response = await getActiveNews();
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const fetchcurrentAirticleDetails = createAsyncThunk(
  "airticleModel/fetchcurrentAirticleDetails",
  async (newsId: string) => {
    try {
      const response = await getNewsDetails(newsId);
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const fetchcurrentAirticleComments = createAsyncThunk(
  "airticleModel/getcurentArticlecomments",
  async (newsId: string) => {
    try {
      const response = await getComments(newsId);
      return response;
    } catch (err) {
      throw err;
    }
  }
);
const airticleModelSlice = createSlice({
  name: "gamemodel",
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.AirticleLoader = false;
      state.AirticleMessage = "";
      state.AirticleFlag = "";
      state.currentAirticleDetail = null;
      state.comments = [];
    },
    setlikeordislike: (state, action) => {
      if (state.currentAirticleDetail) {
        state.currentAirticleDetail.likesCount = action.payload.likesCount;
        state.currentAirticleDetail.dislikesCount =
          action.payload.dislikesCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTheNews.pending, (state) => {
      state.AirticleLoader = true;
    });
    builder.addCase(createTheNews.fulfilled, (state, action) => {
      state.AirticleLoader = false;
      if (action.payload && action.payload.success) {
        state.AirticleFlag = "success";
        state.AirticleMessage = action.payload.message || "";
      } else if (action.payload) {
        state.AirticleFlag = "error";
        state.AirticleMessage = action.payload.message || "";
      }
    });
    builder.addCase(createTheNews.rejected, (state, action) => {
      state.AirticleLoader = false;
      state.AirticleFlag = "error";
      state.AirticleMessage = action.error?.message || "";
    });
    builder.addCase(fetchActiveNews.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.activeAirticles = action.payload.newsData;
      }
    });
    builder.addCase(fetchcurrentAirticleDetails.pending, (state) => {
      state.AirticleLoader = true;
    });
    builder.addCase(fetchcurrentAirticleDetails.fulfilled, (state, action) => {
      state.AirticleLoader = false;
      if (action.payload && action.payload.success) {
        state.currentAirticleDetail = action.payload.airticle;
      }
    });
    builder.addCase(fetchcurrentAirticleDetails.rejected, (state, action) => {
      state.AirticleLoader = false;
      state.currentAirticleDetail = null;
    });
    builder.addCase(fetchcurrentAirticleComments.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.comments = action.payload.comments;
      }
    });

    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.permissions = action.payload.permissionData;
      }
    });
  },
});
export const { resetFlags, setlikeordislike } = airticleModelSlice.actions;

export default airticleModelSlice.reducer;
