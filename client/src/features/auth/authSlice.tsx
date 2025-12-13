import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAuthLog, UserAuthReg } from '../user/types/user';
import { AuthState } from './types/AuthState';
import * as api from './api';
import { User } from '../user/types/user';

const initialState: AuthState = {
  user: undefined,
  error: undefined,
  pending: false,
};

export const registration = createAsyncThunk(
  'auth/regestration',
  (value: UserAuthReg) => api.registrationFetch(value)
);

export const authorization = createAsyncThunk(
  'auth/authorization',
  (value: UserAuthLog) => api.authorizationFetch(value)
);

export const authCheckUser = createAsyncThunk('auth/checkUser', () =>
  api.authCheckUserFetch()
);

export const logOut = createAsyncThunk('auth/logout', () => api.logOutFetch());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    stopPending: (state) => {
      state.pending = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authorization.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(authCheckUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(authCheckUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = undefined;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearError, stopPending } = authSlice.actions;
export default authSlice.reducer;
