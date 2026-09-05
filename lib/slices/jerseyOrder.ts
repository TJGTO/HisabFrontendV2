import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createJerseyOrder } from "../../app/product_jersey/service";
import { IJerseyOrderPayload } from "../../app/product_jersey/domain";

type JerseyOrderState = {
  submitting: boolean;
  error: string | null;
};

const initialState: JerseyOrderState = {
  submitting: false,
  error: null,
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

const jerseyOrderSlice = createSlice({
  name: "jerseyOrder",
  initialState,
  reducers: {
    resetJerseyOrderError: (state) => {
      state.error = null;
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
  },
});

export const { resetJerseyOrderError } = jerseyOrderSlice.actions;
export default jerseyOrderSlice.reducer;
