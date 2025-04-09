"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/cookies";
import { UserDetail } from "@/types/index";
import dayjs from "dayjs";

export default function UserDetailPage() {
    const { id } = useParams();
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getAccessToken();
            if (!token) return;

            try {
                const res = await api.get(`/users/${id}`);
                setUser(res.data as UserDetail);
            } catch (err) {
                console.error("Error fetching user details", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div className="p-6">Loading...</div>;

    if (!user || !user.profile) return notFound();

    const { profile } = user;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Employee: {profile.fullName}</h1>
            <Card className="relative flex flex-col md:flex-row gap-6 p-6">
                {/* Watermark if user inactive */}
                {!user.status && (
                    <Image
                        src="/watermark-inactive.jpg"
                        alt="Inactive"
                        className="absolute inset-0 opacity-15 object-contain w-full h-full pointer-events-none"
                        fill
                    />
                )}

                {/* Avatar */}
                <div>
                    <Image
                        src={profile.avatarUrl || "/avatar-default.png"}
                        alt="Avatar"
                        width={190}
                        height={190}
                        className="rounded-full object-cover shadow"
                    />
                </div>

                {/* User Info */}
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
                    <Info label="First Name" value={profile.firstName} />
                    <Info label="Middle Name" value={profile.middleName} />
                    <Info label="Last Name" value={profile.lastName} />
                    <Info label="Full Name" value={profile.fullName} />
                    <Info label="Username" value={user.username} />
                    <Info label="Email" value={user.email} />
                    <Info label="Email Profile" value={profile.emailProfile} />
                    <Info label="Role" value={user.role} />
                    <Info label="Organization" value={user.organization} />
                    <Info label="Phone" value={profile.phoneNumber} />
                    <Info label="Gender" value={profile.gender} />
                    <Info label="Birth Date" value={formatDate(profile.birthDate)} />
                    <Info label="Address" value={profile.address} />
                    <Info label="Nationality" value={profile.nationality} />
                    <Info label="Identity Number" value={profile.identityNumber} />
                    <Info label="Tax Code" value={profile.taxCode} />
                    <Info label="Marital Status" value={profile.maritalStatus} />
                    <Info label="Position" value={profile.position} />
                    <Info label="Department" value={profile.department} />
                    <Info label="Join Date" value={formatDate(profile.joinDate)} />
                    <Info label="Resign Date" value={formatDate(profile.resignDate) || "N/A"} />
                </CardContent>
            </Card>
        </div>
    );
}

function Info({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <div className="text-sm font-medium text-gray-500">{label}</div>
            <div className="text-base text-gray-900 whitespace-normal break-words">{value || "—"}</div>
        </div>
    );
}

function formatDate(date?: string | Date | null): string {
    if (!date) return "";
    return dayjs(date).format("DD/MM/YYYY");
}
