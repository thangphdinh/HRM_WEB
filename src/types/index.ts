
export interface RefreshTokenResponse {
    accessToken: string;
}

// export interface User
export interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
    organization: string;
    status: boolean;
}

// export interface LoginResponse
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}
