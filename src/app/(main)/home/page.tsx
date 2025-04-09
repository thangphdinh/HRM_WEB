"use client";
import { useAuthStore } from "@/stores/useAuthStore";

export default function HomePage() {
  const { username, role } = useAuthStore();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to HRM System 👋</h1>
      <p className="text-lg">Hello, <span className="font-semibold">{username}</span>! You are logged in as <span className="italic">{role}</span>.</p>
    </div>
  );
}
