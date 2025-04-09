"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import UserTable from "@/components/UserTable";
import { User } from "@/types/index";
import { getAccessToken } from "@/lib/cookies";

export default function DashboardPage() {
    const [userInfo, setUserInfo] = useState<User[]>([]);
    const [error] = useState<string>("");
    const [showError] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const token = getAccessToken();
    
            if (!token) {
              console.log("Chưa login");
              return;
            }
    
            const res = await api.get("/users");
            if (res.status !== 200) {
              console.log("Lỗi không xác thực");
              return;
            }
            setUserInfo(res.data as User[]);
          } catch (err) {
            console.error("Failed to fetch user info:", err);
          }
        };
        fetchUserInfo();
      }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold my-4">User List</h1>

            {/* Overlay để làm mờ nền khi popup xuất hiện */}
            {showError && (
                <div className="fixed inset-0 bg-gray-800 opacity-50 z-40"></div>
            )}

            {/* Popup thông báo lỗi */}
            {showError && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-red-600">ERROR</h2>
                        <p className="mt-4">{error}</p>
                    </div>
                </div>
            )}

            <UserTable users={userInfo} />
        </div>
    );
}