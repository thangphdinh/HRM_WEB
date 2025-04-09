import { create } from "zustand";
import { AuthStore } from "@/types/index";

export const useAuthStore = create<AuthStore>((set) => ({
  userId: null,
  username: null,
  organization: null,
  role: null,
  setAuthInfo: ({ userId, username, organization, role }) =>
    set({ userId, username, organization, role }),
  clearAuthInfo: () =>
    set({ userId: null, username: null, organization: null, role: null }),
}));
