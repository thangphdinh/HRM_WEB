
export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
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

// export interface ViewProfile
export interface UserDetail {
    userId: number;
    username: string;
    email: string;
    role: string;
    organization: string;
    status: boolean;
    profile: Profile;
}
export interface Profile {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    fullName: string;
    birthDate: string;
    gender: string;
    avatarUrl?: string;
    phoneNumber: string;
    emailProfile?: string;
    address?: string;
    nationality?: string;
    identityNumber?: string;
    taxCode?: string;
    maritalStatus?: string;
    position?: string;
    department?: string;
    joinDate?: string;
    resignDate?: string;
}

// export interface AuthStorage
export interface AuthStore {
    userId: number | null;
    username: string | null;
    organization: string | null;
    role: string | null;
    setAuthInfo: (data: {
        userId: number;
        username: string;
        organization: string;
        role: string;
    }) => void;
    clearAuthInfo: () => void;
}
