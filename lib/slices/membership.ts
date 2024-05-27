import { MembershipStoreState, members } from "../../app/membership/domain";
import { getmembershipcards } from "../../app/membership/service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenbershipCardsReqBody } from "../../app/membership/domain";

const initialState: MembershipStoreState = {
  membershipList: [],
  fetchLoader: false,
  fetchError: false,
  totalCount: 0,
};

export const fetchmembershipcards = createAsyncThunk(
  "membershipModel/getmembershipcards",
  async (body: fetchMenbershipCardsReqBody) => {
    try {
      const response = await getmembershipcards(body);
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
        if (
          state.membershipList.length > 0 &&
          action.payload.cards.cards &&
          action.payload.cards.cards.length > 0
        ) {
          let lastmemberID =
            state.membershipList[state.membershipList.length - 1]
              .membershipCardId;
          let fetchedCards = action.payload.cards.cards;
          let findindex = fetchedCards.findIndex(
            (x: members) => x.membershipCardId == lastmemberID
          );
          if (findindex == -1) {
            //we have whole new set of page
            state.membershipList = [...state.membershipList, ...fetchedCards];
          } else {
            // we have the same page but new new members
            state.membershipList = [
              ...state.membershipList,
              ...fetchedCards.splice(findindex + 1, fetchedCards.length),
            ];
          }
        } else {
          state.membershipList = [
            ...state.membershipList,
            ...action.payload.cards.cards,
          ];
        }

        state.totalCount = action.payload.cards.totalCount;
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
