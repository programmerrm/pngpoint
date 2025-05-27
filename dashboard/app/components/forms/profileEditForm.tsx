import React from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import type { AdminProfileType, AdminProfileUpdated } from "~/types/adminType";
import { useAdminProfileUpdatedMutation } from "~/redux/features/admin/adminApi";
import { toast } from "react-toastify";

type Props = {
    profile: AdminProfileType;
    onCancel: () => void;
};

export const ProfileEditForm: React.FC<Props> = ({ profile, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AdminProfileUpdated>();
    const [adminProfileUpdated] = useAdminProfileUpdatedMutation();

    const onSubmit = async (formData: AdminProfileUpdated) => {
        try {
            const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
                if (
                    (typeof value === "string" && value.trim() !== "") ||
                    (value instanceof FileList && value.length > 0) ||
                    (value && typeof value !== "string" && !(value instanceof FileList))
                ) {
                    acc[key as keyof AdminProfileUpdated] = value;
                }
                return acc;
            }, {} as Partial<AdminProfileUpdated>);

            console.log("Filtered form data:", filteredData);

            await adminProfileUpdated(filteredData as AdminProfileUpdated).unwrap(); // 👈 type assertion here
            reset();
            onCancel();
        } catch (err: any) {
            const errorMessage = err?.data?.message || "Something went wrong";
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col flex-wrap w-full gap-y-1">
                <Field label="Image" error={errors.image}>
                    <input
                        className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400
               text-black/90 px-5 py-3 border border-[#babec0] outline-[#38a8e9] rounded-full"
                        type="file"
                        accept="image/*"
                        {...register('image')}
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1">
                <Field label="Username" error={errors.username}>
                    <input
                        className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-3 border border-[#babec0] outline-[#38a8e9] rounded-full"
                        {...register("username")}
                        placeholder={profile?.username}
                        type="text"
                        name="username"
                        id="username"
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1">
                <Field label="Email" error={errors.email}>
                    <input
                        className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-3 border border-[#babec0] outline-[#38a8e9] rounded-full"
                        {...register("email")}
                        type="email"
                        id="email"
                        name="email"
                        placeholder={profile?.email}
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1">
                <Field label="First Name" error={errors.first_name}>
                    <input
                        className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-3 border border-[#babec0] outline-[#38a8e9] rounded-full"
                        {...register("first_name")}
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder={profile?.first_name}
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1">
                <Field label="Last Name" error={errors.last_name}>
                    <input
                        className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-3 border border-[#babec0] outline-[#38a8e9] rounded-full"
                        {...register("last_name")}
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder={profile?.last_name}
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-">
                <Field label="Phone Number" error={errors.number}>
                    <input
                        className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-3 border border-[#babec0] outline-[#38a8e9] rounded-full"
                        {...register("number")}
                        type="text"
                        id="number"
                        name="number"
                        placeholder={profile?.number}
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-full gap-y-1">
                <Field label="Gender" error={errors.gender}>
                    <select
                        className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-3 border border-[#babec0] outline-[#38a8e9] rounded-full"
                        {...register("gender")}
                        id="gender"
                        name="gender"
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </Field>
            </div>
            <div className="flex flex-row flex-wrap space-x-5">
                <button className="cursor-pointer text-white bg-blue-600 btn-style rounded-full px-14 py-4 relative border border-[#38a8e9] uppercase font-medium text-sm overflow-hidden hover:text-white hover:border-black">
                    <span className="absolute inset-0 bg-black"></span>
                    <span className="absolute inset-0 flex justify-center items-center font-semibold">
                        Save
                    </span>
                    Save
                </button>

                <button className="cursor-pointer bg-white btn-style rounded-full px-14 py-4 relative border border-[#38a8e9] uppercase font-medium text-sm overflow-hidden hover:text-white hover:border-black" onClick={onCancel}>
                    <span className="absolute inset-0 bg-black"></span>
                    <span className="absolute inset-0 flex justify-center items-center font-semibold">
                        Cancel
                    </span>
                    Cancel
                </button>
            </div>
        </form>
    );
}
