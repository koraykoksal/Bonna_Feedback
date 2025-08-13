import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentUser: "",
  userID: "",
  loading: false,
  error: false,
  isAdmin: false,
  token: null,
  securityKey:""
}

const authSlice = createSlice({

  name: "auth",
  initialState,

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.email;
      state.isAdmin = false;
      state.token = payload?.accessToken;
      state.userID = payload?.uid


    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = "";
      state.token = null;
    },
    registerSuccess: (state, { payload }) => {

      state.loading = false;
      state.currentUser = payload?.displayName;
      state.token = payload?.accessToken;
      state.error = false;

    },
    fetchLoginData: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload[0]?.NAME + " " + payload[0]?.SURNAME
      state.securityKey = payload[0]?.SECURITYKEY
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  }

})

export const {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchLoginData
  
} = authSlice.actions;

export default authSlice.reducer;