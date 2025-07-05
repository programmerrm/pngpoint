import { useState } from "react";
import { useGetAdminProfileQuery } from "../redux/features/admin/adminApi";
import type { AdminProfileType } from "../types/adminType";
import { ProfileEditForm } from "../components/forms/profileEditForm";


export default function Profile() {
    const { data, isLoading } = useGetAdminProfileQuery(undefined, { refetchOnMountOrArgChange: true });
    const profile: AdminProfileType | undefined = data?.[0];
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleEdit = () => setIsEditing(prev => !prev);

    return (
        <div className="flex flex-col flex-wrap px-10 py-3.5 w-full h-[82%] relative overflow-hidden">
            <div className="flex flex-col flex-wrap justify-center items-center w-full h-full">
                {!isLoading && profile && (
                    <div className="flex flex-col flex-wrap mx-auto w-1/3 py-10 px-10 shadow-xl bg-white/70 rounded-2xl space-y-4 text-base text-gray-800">
                        {isEditing ? (
                            <ProfileEditForm profile={profile} onCancel={toggleEdit} />
                        ) : (
                            <>
                                <img className="w-52 h-44 object-cover rounded" src={profile?.image || undefined} alt={profile.username} />
                                <p><strong>Username:</strong> {profile.username || "N/A"}</p>
                                <p><strong>Email:</strong> {profile.email || "N/A"}</p>
                                <p><strong>First Name:</strong> {profile.first_name || "N/A"}</p>
                                <p><strong>Last Name:</strong> {profile.last_name || "N/A"}</p>
                                <p><strong>Phone Number:</strong> {profile.number || "N/A"}</p>
                                <p><strong>Gender:</strong> {profile.gender || "N/A"}</p>
                                <p><strong>Role:</strong> {profile.role || "N/A"}</p>
                                <div className="flex flex-col flex-wrap w-fit">
                                    <button className="cursor-pointer bg-white btn-style rounded-full px-14 py-4 relative border border-[#38a8e9] uppercase font-medium text-sm overflow-hidden hover:text-white hover:border-black" onClick={toggleEdit}>
                                        <span className="absolute inset-0 bg-black"></span>
                                        <span className="absolute inset-0 flex justify-center items-center font-semibold">
                                            Edit
                                        </span>
                                        Edit
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
