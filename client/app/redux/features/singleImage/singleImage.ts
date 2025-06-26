import { apiSlice } from "../api/apiSlice";

export const singleImage = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSingleImage: builder.query({
            query: (slug: string) => `/images/${slug}/`,
        }),
    }),
});

export const { useGetSingleImageQuery } = singleImage;
