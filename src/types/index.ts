<<<<<<< HEAD:src/types/index.ts
export interface RefreshTokenResponse {
    accessToken: string;
}

// export interface User
=======
// export interface Get List User
>>>>>>> b534c702b9cd1a69ca9d40149c0b0f764a6b17b6:src/types.ts
export interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
    organization: string;
    status: boolean;
<<<<<<< HEAD:src/types/index.ts
}

// export interface LoginResponse
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

=======
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

  
>>>>>>> b534c702b9cd1a69ca9d40149c0b0f764a6b17b6:src/types.ts
