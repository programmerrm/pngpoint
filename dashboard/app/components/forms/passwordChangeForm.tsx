import React, { useState } from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import type { PasswordChangeType } from "~/types/passwordChangeType";
import { ReactIcons } from "~/lib/reactIcons";
import { useAdminPasswordChangeMutation } from "~/redux/features/auth/authApi";
import { toast } from "react-toastify";

type PasswordVisibility = {
    old: boolean;
    new: boolean;
    confirm: boolean;
};

export const PasswordChangeForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState<PasswordVisibility>({ old: false, new: false, confirm: false });

    const [adminPasswordChange, { error, isLoading }] = useAdminPasswordChangeMutation();
    const { handleSubmit, register, formState: { errors }, reset } = useForm<PasswordChangeType>();
    const { IoMdEye, IoMdEyeOff, } = ReactIcons;

    const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field],
        }));
    };


    const onSubmitForm = async (formData: PasswordChangeType) => {
        try {
            await adminPasswordChange(formData).unwrap();
            toast.success("Password change successfully");
            reset();
        } catch (err: any) {
            const errorMessage = err?.data?.message || "Something went wrong";
            console.log(errorMessage)
            toast.error(errorMessage);
        }
    }

    return (
        <form className="flex flex-col flex-wrap w-1/3 gap-y-5 py-10 px-10 shadow-xl bg-white/70 rounded-2xl" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="relative flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="Old Password" error={errors.old_password}>
                    <React.Fragment>
                        <input
                            className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-2.5 border border-[#babec0] outline-[#38a8e9] rounded-full"
                            {...register("old_password", {
                                required: "Old password is required.",
                            })}
                            type={showPassword.old ? "text" : "password"}
                            id="old_password"
                            name="old_password"
                            placeholder="********"
                        />
                        <button className="absolute top-[56%] right-4 cursor-pointer z-50" type="button" onClick={() => togglePasswordVisibility('old')}>
                            {showPassword.old ? (
                                <IoMdEyeOff className="text-xl text-stone-400" />
                            ) : (
                                <IoMdEye className="text-xl text-stone-400" />
                            )}
                        </button>
                    </React.Fragment>
                </Field>
            </div>
            <div className="relative flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="New Password" error={errors.new_password}>
                    <React.Fragment>
                        <input
                            className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-2.5 border border-[#babec0] outline-[#38a8e9] rounded-full"
                            {...register("new_password", {
                                required: "New password is required.",
                            })}
                            type={showPassword.new ? "text" : "password"}
                            id="new_password"
                            name="new_password"
                            placeholder="********"
                        />
                        <button className="absolute top-[56%] right-4 cursor-pointer z-50" type="button" onClick={() => togglePasswordVisibility('new')}>
                            {showPassword.new ? (
                                <IoMdEyeOff className="text-xl text-stone-400" />
                            ) : (
                                <IoMdEye className="text-xl text-stone-400" />
                            )}
                        </button>
                    </React.Fragment>
                </Field>
            </div>
            <div className="relative flex flex-col flex-wrap w-full gap-y-1.5">
                <Field label="Confirm New Password" error={errors.confirm_new_password}>
                    <React.Fragment>
                        <input
                            className="text-base font-normal placeholder:text-base placeholder:font-normal placeholder:text-stone-400 text-black/90 px-5 py-2.5 border border-[#babec0] outline-[#38a8e9] rounded-full"
                            {...register("confirm_new_password", {
                                required: "Confirm new password is required.",
                            })}
                            type={showPassword.confirm ? "text" : "password"}
                            id="confirm_new_password"
                            name="confirm_new_password"
                            placeholder="********"
                        />
                        <button className="absolute top-[56%] right-4 cursor-pointer z-50" type="button" onClick={() => togglePasswordVisibility('confirm')}>
                            {showPassword.confirm ? (
                                <IoMdEyeOff className="text-xl text-stone-400" />
                            ) : (
                                <IoMdEye className="text-xl text-stone-400" />
                            )}
                        </button>
                    </React.Fragment>
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-fit">
                <button className="bg-white btn-style rounded-full cursor-pointer px-14 py-4 relative border border-[#38a8e9] uppercase font-medium text-sm overflow-hidden hover:text-white hover:border-black" type="submit">
                    <span className="absolute inset-0 bg-black"></span>
                    <span className="absolute inset-0 flex justify-center items-center font-semibold">
                        {isLoading ? "Loading..." : "Submit"}
                    </span>
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </div>
        </form>
    );
}
