import { createSlice } from "@reduxjs/toolkit";

// userSlice that keeps the userInfo, which is used during billing time, used local storage also, so that user don't have to enter there details again and again

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: window.localStorage.getItem("myStoreUserInfo")
      ? JSON.parse(window.localStorage.getItem("myStoreUserInfo"))
      : null,
  },
  reducers: {
    //generally create/update the user info.
    addUserInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
      window.localStorage.setItem(
        "myStoreUserInfo",
        JSON.stringify(state.userInfo)
      );
    },
  },
});
export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
