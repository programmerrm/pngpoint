import React from "react";
import { Field } from "../field/field";
import { useForm } from "react-hook-form";
import type { CategoryAddPropsType } from "~/types/categoryType";
import { useAddCategoryMutation } from "~/redux/features/category/categoryApi";

export const CategoryAddForm:React. FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryAddPropsType>();
    const [ addCategory, {isLoading, data} ] = useAddCategoryMutation();
    const onSubmitForm = async (formData: CategoryAddPropsType) => {
        try {
            await addCategory(formData).unwrap();
            console.log(data);
        } catch (err: any) {
            const errorMessage = err?.data?.message || "Something went wrong";
            console.log(errorMessage);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <div>
                <Field label={"Category Name"} error={errors.name}>
                    <input
                        {...register("name", {
                            required: "Category name is required.",
                            minLength: {
                                value: 3,
                                message: "Category name must be at least 3 characters."
                            },
                            maxLength: {
                                value: 80,
                                message: "Category name must be at most 80 characters."
                            },
                        })}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your category name"
                    />
                </Field>
            </div>
            <div>
                <button className="cursor-pointer" type="submit">Send</button>
            </div>
        </form>
    );
}