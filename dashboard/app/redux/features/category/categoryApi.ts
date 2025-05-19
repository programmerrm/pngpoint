import type { CategoryAddPropsType } from "~/types/categoryType";
import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCategory: builder.mutation<void, CategoryAddPropsType>({
            query: (data) => ({
                url: "/image_upload/admin/created/category/",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useAddCategoryMutation } = categoryApi;
