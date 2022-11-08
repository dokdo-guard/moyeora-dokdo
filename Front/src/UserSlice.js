import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    nickname: "",
    accessToken: "",
    userCharacter: "",
  },
};

export const UserSlice = createSlice({
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

export default UserSlice.reducer;
export const { login, logout } = UserSlice.actions;
