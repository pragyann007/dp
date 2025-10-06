// src/redux/userPaid.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  enrolledCourses: [],
  isPaid: false,
  payments: [], // for MyPayment component
};

const paidUserSlice = createSlice({
  name: "paidUser",
  initialState,
  reducers: {
    setPaidUserData: (state, action) => {
      const { userId, enrolledCourses, isPaid } = action.payload;
      state.userId = userId;
      state.enrolledCourses = enrolledCourses;
      state.isPaid = isPaid;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    clearPaidUserData: (state) => {
      state.userId = null;
      state.enrolledCourses = [];
      state.isPaid = false;
      state.payments = [];
    },
  },
});

export const { setPaidUserData, setPayments, clearPaidUserData } =
  paidUserSlice.actions;
export default paidUserSlice.reducer;
