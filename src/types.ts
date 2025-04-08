// export interface Get List User
export interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
    organization: string;
    status: boolean;
  }
// export interface Login
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

  