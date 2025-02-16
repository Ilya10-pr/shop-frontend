import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, IUser } from '../../types/types';
import { authMeThunk, loginUserThunk, registerUserThunk, updateAmountUserThunk } from './authThunk';


const initialState: IAuth = {
  auth: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth', 
  initialState, 
  reducers: {
    updateCountCart : (state, action: PayloadAction<number>) => {
      if(state.auth){
        state.auth.productCount = action.payload
      }
    }
  },
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

      .addCase(updateAmountUserThunk.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateAmountUserThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(updateAmountUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});



export const {updateCountCart} = authSlice.actions;

export default authSlice.reducer

