import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterPropsType } from "../../types/auth/registerPropsType";
import { toast } from "react-toastify";
import { Field } from "./../field/field";
import { ReactIcons } from "../../utils/reactIcons";

export const RegisterForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterPropsType>();
    const [show, setShow] = useState({ password: false, confirm: false });
    const { IoMdEye, IoMdEyeOff } = ReactIcons;

    const toggleVisibility = (field: "password" | "confirm") => {
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const onSubmitForm = async (formData: RegisterPropsType) => {
        try {
            console.log(formData);
            toast.success("Login successfully");
            reset();
        } catch (err: any) {
            const errorMessage = err?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
    };

    return (
        <form className="flex flex-col flex-wrap gap-y-2.5 md:gap-y-5 w-full text-black" onSubmit={handleSubmit(onSubmitForm)}>

            {/* Username Field */}
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                <Field label={"Enter your username"} error={errors.username}>
                    <input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message: "Username must be at least 10 characters",
                            },
                            maxLength: {
                                value: 40,
                                message: "Username must be at most 40 characters",
                            },
                        })}
                        className="text-black placeholder:text-black text-sm md:text-base font-normal placeholder:text-sm md:placeholder:text-base placeholder:font-normal py-3 px-2.5 md:px-3.5 border border-black rounded-xl"
                        type="text"
                        name="username"
                        id="username"
                        autoFocus
                        placeholder="Enter your username"
                    />
                </Field>
            </div>

            {/* Email Field */}
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                <Field label={"Enter your email"} error={errors.email}>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Enter a valid email.",
                            },
                            minLength: {
                                value: 10,
                                message: "Email must be at least 10 characters",
                            },
                            maxLength: {
                                value: 40,
                                message: "Email must be at most 40 characters",
                            },
                        })}
                        className="text-black placeholder:text-black text-sm md:text-base font-normal placeholder:text-sm md:placeholder:text-base placeholder:font-normal py-3 px-2.5 md:px-3.5 border border-black rounded-xl"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                    />
                </Field>
            </div>

            {/* Number Field */}
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                <Field label={"Enter your number"} error={errors.number}>
                    <input
                        {...register("number", {
                            required: "Number is required",
                            minLength: {
                                value: 11,
                                message: "Number must be at least 10 characters",
                            },
                            maxLength: {
                                value: 20,
                                message: "Number must be at most 40 characters",
                            },
                        })}
                        className="text-black placeholder:text-black text-sm md:text-base font-normal placeholder:text-sm md:placeholder:text-base placeholder:font-normal py-3 px-2.5 md:px-3.5 border border-black rounded-xl"
                        type="text"
                        name="number"
                        id="number"
                        autoFocus
                        placeholder="Enter your number"
                    />
                </Field>
            </div>

            {/* Password Field */}
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full relative">
                <Field label={"Enter your password"} error={errors.password}>
                    <div className="flex flex-col flex-wrap w-full relative">
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 5,
                                    message: "Password must be at least 5 characters",
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Password must be at most 15 characters",
                                },
                            })}
                            className="text-black placeholder:text-black text-sm md:text-base font-normal placeholder:text-sm md:placeholder:text-base placeholder:font-normal py-3 px-3.5 border border-black rounded-xl"
                            type={show.password ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="********"
                        />
                        <button
                            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer z-50"
                            type="button"
                            onClick={() => toggleVisibility("password")}
                        >
                            {show.password ? (
                                <IoMdEyeOff className="text-black text-lg md:text-xl" />
                            ) : (
                                <IoMdEye className="text-black text-lg md:text-xl" />
                            )}
                        </button>
                    </div>
                </Field>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full relative">
                <Field label={"Enter your confirm password"} error={errors.confirm_password}>
                    <div className="flex flex-col flex-wrap w-full relative">
                        <input
                            {...register("confirm_password", {
                                required: "Confirm password is required",
                                minLength: {
                                    value: 5,
                                    message: "Confirm password must be at least 5 characters",
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Confirm password must be at most 15 characters",
                                },
                            })}
                            className="text-black placeholder:text-black text-sm md:text-base font-normal placeholder:text-sm md:placeholder:text-base placeholder:font-normal py-3 px-3.5 border border-black rounded-xl"
                            type={show.confirm ? "text" : "password"}
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="********"
                        />
                        <button
                            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer z-50"
                            type="button"
                            onClick={() => toggleVisibility("confirm")}
                        >
                            {show.confirm ? (
                                <IoMdEyeOff className="text-black text-lg md:text-xl" />
                            ) : (
                                <IoMdEye className="text-black text-lg md:text-xl" />
                            )}
                        </button>
                    </div>
                </Field>
            </div>

            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                <Field label={""} error={errors.terms_condition}>
                    <div>
                        <input type="checkbox" name="" id="" />
                        <span>terms & condition</span>
                    </div>
                </Field>
            </div>

            <div className="flex flex-col flex-wrap w-full">
                <button className="bg-black text-white text-sm md:text-base font-medium px-10 py-3.5 rounded-xl cursor-pointer" type="submit">
                    {/* {isLoading ? "Loading..." : "Login"} */} Register
                </button>
            </div>
        </form>
    );
}
