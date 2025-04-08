"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/api.client";

export default function Navbar() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    const refreshToken = localStorage.getItem("refreshToken");

    // Kiểm tra nếu refreshToken có trong localStorage
    if (!refreshToken) {
      // Nếu không có refreshToken, xóa các token và chuyển hướng ngay lập tức
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
      setIsLoggingOut(false); // Set lại trạng thái để mở lại button
      return;
    }

    try {
      // Gọi API logout
      const response = await api.post("/auth/logout", { refreshToken });

      if (response.status === 200) {
        // Nếu logout thành công, xóa thông tin trong localStorage và chuyển hướng
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
      } else {
        // Nếu có lỗi từ API, có thể thông báo lỗi cho người dùng
        console.error("Logout failed:", response.data || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    } finally {
      setIsLoggingOut(false); // Set lại trạng thái khi logout hoàn tất
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex items-center justify-between space-x-6">
      <span className="text-2xl font-bold tracking-wide">HRM Dashboard</span>

      {/* Navigation Menu */}
      <div className="flex items-center space-x-6">
        <button className="text-lg hover:bg-blue-700 p-2 rounded-md transition-all">
          Home
        </button>
        <button className="text-lg hover:bg-blue-700 p-2 rounded-md transition-all">
          Reports
        </button>
        <button className="text-lg hover:bg-blue-700 p-2 rounded-md transition-all">
          Settings
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut} // Disable the button while logging out
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition-all"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
}
