import React, { useState } from "react"
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type { LoginPropsType } from "~/types/loginType";
import { useAddLoginMutation } from "~/redux/features/auth/authApi";
import { Field } from "../field/field";
import { ReactIcons } from "~/lib/reactIcons";

export const LoginForm: React.FC = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginPropsType>();
    const [addLogin, { isLoading }] = useAddLoginMutation();
    const { IoMdEye, IoMdEyeOff } = ReactIcons;

    const onSubmitForm = async (formData: LoginPropsType) => {
        try {
            await addLogin(formData).unwrap();
            toast.success("Login successfully");
            navigate("/");
            reset();
        } catch (err: any) {
            const errorMessage = err?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
    }
    return (
        <form className="flex flex-col flex-wrap gap-y-5 mt-8 w-full text-white" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                <Field label={"Enter your email"} error={errors.email}>
                    <input
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Enter a valid email."
                            },
                            minLength: {
                                value: 10,
                                message: "Email must be at least 10 characters."
                            },
                            maxLength: {
                                value: 40,
                                message: "Email must be at most 40 characters."
                            },
                        })}
                        className="text-white placeholder:text-white text-base font-normal placeholder:text-base placeholder:font-normal py-3 px-3.5 border border-white rounded-xl"
                        type="email"
                        name="email"
                        id="email"
                        autoFocus
                        placeholder="Enter your email"
                    />
                </Field>
            </div>
            <div className="flex flex-col flex-wrap gap-y-2.5 w-full relative">
                <Field label={"Enter your password"} error={errors.password}>
                    <>
                        <input
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 5,
                                    message: "Password must be at least 5 characters."
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Password must be at most 15 characters."
                                },
                            })}
                            className="text-white placeholder:text-white text-base font-normal placeholder:text-base placeholder:font-normal py-3 px-3.5 border border-white rounded-xl"
                            type={isShow ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="********"
                        />
                        <button className="absolute top-[58%] right-4 cursor-pointer z-50" type="button" onClick={() => setIsShow(prev => !prev)}>
                            {isShow ? (
                                <IoMdEyeOff className="text-xl" />
                            ) : (
                                <IoMdEye className="text-xl" />
                            )}
                        </button>
                    </>
                </Field>
            </div>
            <div className="flex flex-col flex-wrap w-fit">
                <Link className="border-b-2 pb-0.5" to={"/"}>Forgot Password</Link>
            </div>
            <div className="flex flex-col flex-wrap w-fit">
                <button className="bg-black text-white text-base font-medium px-10 py-3.5 rounded-xl cursor-pointer" type="submit">
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </div>
        </form>
    );
}
