import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./slices/authorization";

export const makeStore = () => {
  return configureStore({
    reducer: { authorization: authorizationReducer },
  });
};

export const store = makeStore();
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
