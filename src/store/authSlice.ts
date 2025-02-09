import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, IUser } from '../types/types';
import { authMeThunk, loginUserThunk, registerUserThunk } from './authThunk';
import { authMe } from '../services/ProductServices';


const initialState: IAuth = {
  auth: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth', 
  initialState, 
  reducers: {},
  extraReducers:  (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(authMeThunk.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(authMeThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(authMeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});



export const {} = authSlice.actions;

export default authSlice.reducer

