"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_ACTIONS } from "@/core/constants/authConstants";
import type { RootState } from "@/redux/store"; // Import RootState for typing

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {}

// New interface for OTP verification request
export interface OtpVerifyCredentials {
  phoneNumber: string;
  otp: string;
}

// New interface for OTP verification response
export interface OtpVerificationResponse {
  token: string;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: AUTH_ACTIONS.LOGIN,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: AuthResponse, meta) => {
        const authHeader = meta?.response?.headers?.get("authorization");
        const refreshToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("refreshToken="))
          ?.split("=")[1];

        if (authHeader) {
          const accessToken = authHeader.split(" ")[1];
          return {
            ...response,
            tokens: {
              ...response.tokens,
              accessToken,
              refreshToken: refreshToken || response.tokens.refreshToken,
            },
          };
        }
        return response;
      },
    }),
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: AUTH_ACTIONS.REGISTER,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: AuthResponse, meta) => {
        const authHeader = meta?.response?.headers?.get("authorization");

        // Log to check what's being fetched
        console.log("Response Tokens:", response.tokens);

        if (authHeader) {
          const accessToken = authHeader.split(" ")[1];
          return {
            ...response,
            tokens: {
              ...response.tokens,
              accessToken,
              refreshToken: response.tokens.refreshToken,
            },
          };
        }
        return response;
      },
    }),
    // New OTP verification mutation
    otpMobileVerify: builder.mutation<OtpVerificationResponse, OtpVerifyCredentials>({
      query: (credentials) => ({
        url: AUTH_ACTIONS.MOBILE_OTP_VERIFY,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useOtpMobileVerifyMutation } = authApi;
