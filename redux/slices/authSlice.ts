// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/features/auth/interfaces/auth.interface';
import { AUTH_STATUSES } from '@/core/constants/authConstants';
import { authApi } from '@/features/auth/services/authRTKs';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  status: AUTH_STATUSES.IDLE,
  error: null,
};

// Create the authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set authentication data
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string; role: string }>
    ) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
    },

    // Action to logout the user and clear auth state
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = AUTH_STATUSES.IDLE;
      state.error = null;
    },

    // Action to set loading state
    setLoading: (state) => {
      state.status = 'loading';
    },

    // Action to set error state
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },

    // Action to reset error state
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    // Handling login mutation
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const { tokens } = action.payload;
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
        state.isAuthenticated = true;
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.error = null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.status = AUTH_STATUSES.FAILED;
      }
    );

    // Handling register mutation
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        const { tokens } = action.payload;
        if (action.payload.tokens) {
          state.accessToken = tokens.accessToken;
        } else {
          console.error("Registration response missing tokens:", action.payload);
        }
        state.refreshToken = tokens.refreshToken;
        state.isAuthenticated = true;
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.error = null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchRejected,
      (state, action) => {
        state.error = action.error.message || 'Registration failed';
        state.status = AUTH_STATUSES.FAILED;
      }
    );

    // Handling OTP verification mutation
    builder.addMatcher(
      authApi.endpoints.otpMobileVerify.matchFulfilled,
      (state, action) => {
        // Update the accessToken with the token received from OTP verification.
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.status = AUTH_STATUSES.SUCCEEDED;
        state.error = null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.otpMobileVerify.matchRejected,
      (state, action) => {
        state.error = action.error.message || 'OTP Verification failed';
        state.status = AUTH_STATUSES.FAILED;
      }
    );
  },
});

// Export actions and reducer
export const { setCredentials, logout, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
