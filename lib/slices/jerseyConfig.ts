import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getJerseyConfig } from "../../app/product_jersey/service";
import { IJerseyRemoteConfig } from "../../app/product_jersey/domain";

type JerseyConfigState = {
  loading: boolean;
  config: IJerseyRemoteConfig | null;
  error: string | null;
};

const initialState: JerseyConfigState = {
  loading: false,
  config: null,
  error: null,
};

export const fetchJerseyConfig = createAsyncThunk(
  "jerseyConfig/fetchJerseyConfig",
  async () => {
    try {
      const response = await getJerseyConfig();
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const jerseyConfigSlice = createSlice({
  name: "jerseyConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJerseyConfig.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJerseyConfig.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success && action.payload.config) {
        state.config = action.payload.config;
      } else {
        state.error = action.payload?.message || "Failed to load jersey config";
      }
    });
    builder.addCase(fetchJerseyConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to load jersey config";
    });
  },
});

export default jerseyConfigSlice.reducer;
