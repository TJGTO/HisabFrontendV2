import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./slices/authorization";
import dashboardReducer from "./slices/dashboard";
import profileSectionReducer from "./slices/profileSection";
import gameModelReducer from "./slices/gamemodule";
import airticleModelSlice from "./slices/airticle";
import membershipModelSlice from "./slices/membership";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authorization: authorizationReducer,
      dashboard: dashboardReducer,
      profileSection: profileSectionReducer,
      gameModel: gameModelReducer,
      airticle: airticleModelSlice,
      membership: membershipModelSlice,
    },
  });
};

export const store = makeStore();
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
