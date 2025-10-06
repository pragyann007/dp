import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js"; // existing user slice
import paidUserReducer from "./userPaid.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    paidUser: paidUserReducer,
  },
});
