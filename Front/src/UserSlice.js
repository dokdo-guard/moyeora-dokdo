import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "initialUserName",
    nickname: "initialNickname",
    accessToken: "initialAccessToken",
    character: "initialCharacter",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // 로그인
      state.value = action.payload;
    },
    logout: (state, action) => {
      // 로그아웃
      state.value = initialState;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
