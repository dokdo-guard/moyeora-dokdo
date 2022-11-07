import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: {
    // username: "initialUserName",
    // nickname: "initialNickname",
    accessToken: "initialAccessToken",
    // character: "initialCharacter",
  },
};

export const getUserInfo = createAsyncThunk(
  "user/fetchByAccessToken",
  async () => {
    const res = await axios.get({
      url: "https://k7d204.p.ssafy.io/api/user",
      headers: {
        "content-type": "application/json",
      },
    });
  },
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // 로그인
      state.value.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      // 로그아웃
      state.value = initialState;
    },
  },
});

export default UserSlice.reducer;
export const { login, logout } = UserSlice.actions;
