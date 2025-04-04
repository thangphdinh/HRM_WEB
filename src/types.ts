export interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
    organization: string;
    status: boolean;
  }

  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
  