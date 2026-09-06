import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getJerseyDashboard, updateJerseyOrderStatus } from "../../app/jersey_dashboard/service";
import { IJerseyDashboardStats } from "../../app/jersey_dashboard/domain";

type JerseyDashboardState = {
  loading: boolean;
  stats: IJerseyDashboardStats | null;
  error: string | null;
  updatingStatus: boolean;
  updateStatusError: string | null;
};

const initialState: JerseyDashboardState = {
  // Starts true — see the same reasoning in lib/slices/jerseyConfig.ts, this
  // avoids a hydration mismatch on the first client render.
  loading: true,
  stats: null,
  error: null,
  updatingStatus: false,
  updateStatusError: null,
};

export const fetchJerseyDashboard = createAsyncThunk(
  "jerseyDashboard/fetchJerseyDashboard",
  async () => {
    try {
      const response = await getJerseyDashboard();
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "jerseyDashboard/updateOrderStatus",
  async ({ orderId, status }: { orderId: string; status: "verified" | "rejected" }) => {
    try {
      const response = await updateJerseyOrderStatus(orderId, status);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const jerseyDashboardSlice = createSlice({
  name: "jerseyDashboard",
  initialState,
  reducers: {
    resetUpdateStatusError: (state) => {
      state.updateStatusError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJerseyDashboard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchJerseyDashboard.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.success && action.payload.stats) {
        state.stats = action.payload.stats;
      } else {
        state.error = action.payload?.message || "Failed to load dashboard";
      }
    });
    builder.addCase(fetchJerseyDashboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to load dashboard";
    });

    builder.addCase(updateOrderStatus.pending, (state) => {
      state.updatingStatus = true;
      state.updateStatusError = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.updatingStatus = false;
      if (action.payload && action.payload.success && action.payload.order && state.stats) {
        const updated = action.payload.order;
        state.stats.orders = state.stats.orders.map((o) =>
          o._id === updated._id ? updated : o
        );
      } else {
        state.updateStatusError = action.payload?.message || "Failed to update order";
      }
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.updatingStatus = false;
      state.updateStatusError = action.error?.message || "Failed to update order";
    });
  },
});

export const { resetUpdateStatusError } = jerseyDashboardSlice.actions;
export default jerseyDashboardSlice.reducer;
