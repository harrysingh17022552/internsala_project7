import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: window.localStorage.getItem("userInfo")
      ? JSON.parse(window.localStorage.getItem("userInfo"))
      : null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
      window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});
export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
