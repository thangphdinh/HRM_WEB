"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { api } from "@/lib/api";
import { LoginResponse } from "@/types/index";
import Cookies from "js-cookie";
=======
import api from "@/lib/api.client";
import { LoginResponse } from "@/types";
>>>>>>> b534c702b9cd1a69ca9d40149c0b0f764a6b17b6

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await api.post<LoginResponse>("/auth/login", { email, password });
<<<<<<< HEAD
            if (response.status === 200) {
                const { accessToken, refreshToken } = response.data;    
                // Set cookies for access and refresh tokens
                Cookies.set("accessToken", accessToken, {
                     path: "/", 
                     expires: 1 / 24, // 1 hour in days
                     secure: false, // Set to false for local development, true for production
                     sameSite: "Strict" 
                    });
                Cookies.set("refreshToken", refreshToken, { 
                    path: "/",
                    expires: 7, // 7 days in days
                    secure: false, // Set to false for local development, true for production
                    sameSite: "Strict" 
                });
                router.push("/home");
            }
            else {
                setError("Invalid credentials. Please try again.");
            }
=======
            const { accessToken, refreshToken } = response.data;

            // Gửi toke xuống API route để set vào cookie
            await fetch("/api/auth/set-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken, refreshToken }),
            });

            router.push("/dashboard");
>>>>>>> b534c702b9cd1a69ca9d40149c0b0f764a6b17b6
        } catch (err) {
            console.error(err);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                    Login
                </button>
            </div>
        </div>
    );
}
