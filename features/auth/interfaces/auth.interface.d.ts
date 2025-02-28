interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  status: string;
 isAuthenticated: boolean;
  error: string | null;
}


export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface GoogleSignInData {
  googleToken: string;
}
 // auth.payloads.ts
export interface LoginPayload {

    user: {
      role: string;
    };
  headers: {
    authorization?: string;
  };
}

export interface RejectedPayload {
  error: string; // Error message returned by the API or generated internally
}

export interface LogoutPayload {
  message: string; // Optional: Represents success message returned after logout
}

export interface RegistrationPayload {
 data: {
    user: {
      role: string;
    };
  };
  headers: {
    authorization?: string;
  }; // Optional: Success message post-registration
}

export interface ForgotPasswordPayload {
  message: string; // Represents success message after sending password reset link
}

export interface ResetPasswordPayload {
  message: string; // Represents success message after resetting password
}

export interface GoogleSignInPayload {
  accessToken: string;
  role: string;
}
