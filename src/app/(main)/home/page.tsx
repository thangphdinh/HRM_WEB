"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@/types";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data as User);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to HRM System 👋</h1>
      {user && (
        <p className="text-lg">Hello, <span className="font-semibold">{user.username}</span>! You are logged in as <span className="italic">{user.role}</span>.</p>
      )}
    </div>
  );
}
