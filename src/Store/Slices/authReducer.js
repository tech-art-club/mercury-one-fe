import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  name: '',
  login: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAddUserInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAddUserInfo } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
