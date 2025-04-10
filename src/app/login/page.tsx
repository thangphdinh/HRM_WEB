"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { LoginResponse } from "@/types/index";
import { setAuthCookies } from "@/lib/cookies";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ email và mật khẩu.");
            return;
        }
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
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
                <div className="flex flex-col items-center mb-6">
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img src="/icon_hrm.png" alt="Logo" className="w-14 h-14 mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">HRM System</h2>
                </div>

                {error && (
                    <p className="bg-red-100 text-red-600 text-sm text-center py-2 px-4 rounded mb-4 animate-shake">
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="accent-indigo-600"
                            />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <a href="#" className="text-indigo-500 hover:underline">Quên mật khẩu?</a>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 disabled:opacity-60 flex justify-center items-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Đang đăng nhập...
                            </>
                        ) : (
                            'Đăng nhập'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
