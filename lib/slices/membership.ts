import { MembershipStoreState } from "../../app/membership/domain";
import { getmembershipcards } from "../../app/membership/service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: MembershipStoreState = {
  membershipList: [],
  fetchLoader: false,
  fetchError: false,
};

export const fetchmembershipcards = createAsyncThunk(
  "membershipModel/getmembershipcards",
  async () => {
    try {
      const response = await getmembershipcards();
      return response;
    } catch (err) {
      throw err;
    }
  }
);

const membershipModelSlice = createSlice({
  name: "membershipModel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchmembershipcards.pending, (state) => {
      state.fetchLoader = true;
    });
    builder.addCase(fetchmembershipcards.fulfilled, (state, action) => {
      state.fetchLoader = false;
      if (action.payload && action.payload.success) {
        state.membershipList = action.payload.cards;
      } else if (action.payload) {
        state.fetchError = true;
      }
    });
    builder.addCase(fetchmembershipcards.rejected, (state, action) => {
      state.fetchLoader = false;
      state.fetchError = true;
    });
  },
});

export default membershipModelSlice.reducer;
