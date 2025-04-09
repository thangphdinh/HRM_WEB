import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getFromApi } from "@/lib/api.server";
import { UserDetail } from "@/types";

export const dynamic = "force-dynamic"; // Force revalidation on every request
export default async function UserDetailPage({ params }: { params: { id: string } }) {
    const user = (await getFromApi(`/users/${params.id}`)) as UserDetail | null;

    if (!user || !user.profile) return notFound();

    const { profile } = user;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">User Detail</h1>
            <Card className="flex flex-col md:flex-row gap-6 p-6">
                <div>
                    <Image
                        src={profile.avatarUrl || "/avatar-default.png"}
                        alt="Avatar"
                        width={160}
                        height={160}
                        className="rounded-full object-cover shadow"
                    />
                </div>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Info label="Birth Date" value={profile.birthDate} />
                    <Info label="Address" value={profile.address} />
                    <Info label="Nationality" value={profile.nationality} />
                    <Info label="Identity Number" value={profile.identityNumber} />
                    <Info label="Tax Code" value={profile.taxCode} />
                    <Info label="Marital Status" value={profile.maritalStatus} />
                    <Info label="Position" value={profile.position} />
                    <Info label="Department" value={profile.department} />
                    <Info label="Join Date" value={profile.joinDate} />
                    <Info label="Resign Date" value={profile.resignDate || "N/A"} />
                </CardContent>
            </Card>
        </div>
    );
}

function Info({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <div className="text-sm font-medium text-gray-500">{label}</div>
            <div className="text-base text-gray-900">{value || "—"}</div>
        </div>
    );
}
