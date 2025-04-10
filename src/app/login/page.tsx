"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { LoginResponse } from "@/types/index";
import { setAuthCookies } from "@/lib/cookies";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await api.post<LoginResponse>("/auth/login", { email, password, rememberMe });
            const { accessToken, refreshToken } = response.data;
            // Set cookies for access and refresh tokens base on rememberMe
            setAuthCookies(accessToken, refreshToken, rememberMe);
            router.push("/home");
        } catch (err) {
            console.error("Login error:", err);
            setError("Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Đăng nhập</h2>

                {error && (
                    <p className="bg-red-100 text-red-600 text-sm text-center py-2 px-4 rounded mb-4">
                        {error}
                    </p>
                )}

                <div className="space-y-4">
                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Remember me + Forgot */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="accent-blue-600"
                            />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex justify-center items-center">
                                <svg
                                    className="animate-spin h-5 w-5 text-white mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Đang đăng nhập...
                            </span>
                        ) : (
                            'Đăng nhập'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
