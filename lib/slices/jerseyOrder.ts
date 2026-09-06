import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createJerseyOrder, uploadJerseyScreenshot } from "../../app/product_jersey/service";
import { IJerseyOrderPayload, IJerseyUploadedScreenshot } from "../../app/product_jersey/domain";

type JerseyOrderState = {
  submitting: boolean;
  error: string | null;
  uploading: boolean;
  uploadError: string | null;
  uploadedScreenshot: IJerseyUploadedScreenshot | null;
};

const initialState: JerseyOrderState = {
  submitting: false,
  error: null,
  uploading: false,
  uploadError: null,
  uploadedScreenshot: null,
};

export const submitJerseyOrder = createAsyncThunk(
  "jerseyOrder/submitJerseyOrder",
  async (payload: IJerseyOrderPayload) => {
    try {
      const response = await createJerseyOrder(payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const uploadPaymentScreenshot = createAsyncThunk(
  "jerseyOrder/uploadPaymentScreenshot",
  async (file: File) => {
    try {
      const response = await uploadJerseyScreenshot(file);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const jerseyOrderSlice = createSlice({
  name: "jerseyOrder",
  initialState,
  reducers: {
    resetJerseyOrderError: (state) => {
      state.error = null;
    },
    resetUploadedScreenshot: (state) => {
      state.uploadedScreenshot = null;
      state.uploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitJerseyOrder.pending, (state) => {
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(submitJerseyOrder.fulfilled, (state, action) => {
      state.submitting = false;
      if (!action.payload || !action.payload.success) {
        state.error = action.payload?.message || "Failed to save order";
      }
    });
    builder.addCase(submitJerseyOrder.rejected, (state, action) => {
      state.submitting = false;
      state.error = action.error?.message || "Failed to save order";
    });

    builder.addCase(uploadPaymentScreenshot.pending, (state) => {
      state.uploading = true;
      state.uploadError = null;
      state.uploadedScreenshot = null;
    });
    builder.addCase(uploadPaymentScreenshot.fulfilled, (state, action) => {
      state.uploading = false;
      if (action.payload && action.payload.success && action.payload.screenshot) {
        state.uploadedScreenshot = action.payload.screenshot;
      } else {
        state.uploadError = action.payload?.message || "Failed to upload screenshot";
      }
    });
    builder.addCase(uploadPaymentScreenshot.rejected, (state, action) => {
      state.uploading = false;
      state.uploadError = action.error?.message || "Failed to upload screenshot";
    });
  },
});

export const { resetJerseyOrderError, resetUploadedScreenshot } = jerseyOrderSlice.actions;
export default jerseyOrderSlice.reducer;
