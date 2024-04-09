"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Features/counter/counterSlice";
import timerReducer from "./Features/timer/timerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
