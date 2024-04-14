"use client";

import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./Features/timer/timerSlice";
import UserInfoSlice from "./Features/userInfo/userInfoSlice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    userInfo: UserInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
