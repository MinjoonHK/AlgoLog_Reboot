"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface UserInfoSlice {
  value: string;
}

const initialState: UserInfoSlice = {
  value: "",
};

export const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.value = action.payload;
    },
    clearUserId: (state) => {
      state.value = "";
    },
  },
});

export const { setUserId, clearUserId } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
