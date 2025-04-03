"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";
import UserTable from "@/components/UserTable";
import Navbar from "@/components/Navbar";
import { User } from "@/types";
import { AxiosError } from "axios";

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get<User[]>("/users");
                setUsers(response.data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 403) {
                        setError("YOU DON'T HAVE PERMISSION TO ACCESS THIS PAGE!");
                        setShowError(true);
                        setTimeout(() => {
                            router.push("/");
                        }, 4000);
                    } else {
                        console.error("Lỗi khi lấy dữ liệu:", err);
                    }
                } else {
                    console.error("Lỗi không xác định:", err);
                }
            }
        };

        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
        } else {
            fetchUsers();
        }
    }, [router]);

    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <h1 className="text-2xl font-bold my-4">Dashboard - User List</h1>

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

            <UserTable users={users} />
        </div>
    );
}