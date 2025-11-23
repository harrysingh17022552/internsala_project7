import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: window.localStorage.getItem("myStoreUserInfo")
      ? JSON.parse(window.localStorage.getItem("myStoreUserInfo"))
      : null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
      window.localStorage.setItem("myStoreUserInfo", JSON.stringify(state.userInfo));
    },
  },
});
export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
