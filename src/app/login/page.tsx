"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api"; // Import file API đã tạo

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post<{ accessToken: string; refreshToken: string }>("/auth/login", { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Chuyển hướng sau khi login thành công
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
