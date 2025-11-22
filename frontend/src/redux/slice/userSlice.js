import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },
  },
});
export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
