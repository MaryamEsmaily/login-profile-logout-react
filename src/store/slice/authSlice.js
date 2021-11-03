import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.access_token = action.payload.access_token;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.access_token = null;
      state.name = "";
      localStorage.clear();
      window.location.href = "/Login";
    },
  },
});

export const { setData, logout } = authSlice.actions;

export default authSlice.reducer;
