/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { clearAuthCookies, getRefreshToken } from "@/lib/cookies";
import { User } from "@/types/index";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore"; /* Dùng store để lưu trữ thông tin sau khi login, gọi là global state (sử dụng lib zustand) */

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setAuthInfo } = useAuthStore()

  // Get current user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        const userData = res.data as User;
        setUser(userData);
        setAuthInfo({
          userId: userData.userId,
          username: userData.username,
          role: userData.role,
          organization: userData.organization,
        });
      } catch (err) {
        console.error("Failed to get user info", err);
      }
    };
    fetchUser();
  },);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthCookies();
      router.push("/login");
      return;
    }

    try {
      await api.post("/auth/logout", { refreshToken });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearAuthCookies();
      router.push("/login");
      setIsLoggingOut(false);
    }
  };
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
      <span className="text-2xl font-bold tracking-wide">
        <Link href="/home" className="flex items-center gap-2">
          <img src="/icon_hrm.png" alt="HRM icon" className="h-10" />
          HRM APP
        </Link>
      </span>

      <div className="flex items-center space-x-6">
        <Link href="/home" className="hover:bg-blue-700 px-3 py-2 rounded-md">
          Home
        </Link>
        <Link href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">
          Reports
        </Link>
        <Link href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">
          Settings
        </Link>
        {user && (user.role === "Admin" || user.role === "SystemAdmin") && (
          <Link
            href="/dashboard"
            className="hover:bg-blue-700 px-3 py-2 rounded-md"
          >
            Dashboard
          </Link>
        )}

        {/* Dropdown Menu for user */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white text-base font-semibold">
                {user.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-gray-500">Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/user/${user.userId}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 font-medium"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      </div>
    </nav>
  );

}
