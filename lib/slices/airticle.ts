import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNewsReqBody, IAirticleState } from "../../app/news/domain";

<<<<<<< HEAD
import {
  createNews,
  getActiveNews,
  getNewsDetails,
} from "../../app/news/service";
=======
import { createNews, getActiveNews } from "../../app/news/service";
>>>>>>> 43ee4b9814c1a795ff20a2401508a69b291cce52

const initialState: IAirticleState = {
  AirticleLoader: false,
  AirticleMessage: "",
  AirticleFlag: "",
  activeAirticles: [],
<<<<<<< HEAD
  currentAirticleDetail: null,
=======
>>>>>>> 43ee4b9814c1a795ff20a2401508a69b291cce52
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
<<<<<<< HEAD
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
=======

>>>>>>> 43ee4b9814c1a795ff20a2401508a69b291cce52
const airticleModelSlice = createSlice({
  name: "gamemodel",
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.AirticleLoader = false;
      state.AirticleMessage = "";
      state.AirticleFlag = "";
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
<<<<<<< HEAD
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
    });
=======
>>>>>>> 43ee4b9814c1a795ff20a2401508a69b291cce52
  },
});
export const { resetFlags } = airticleModelSlice.actions;

export default airticleModelSlice.reducer;
