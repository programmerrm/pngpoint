import { apiSlice } from "../api/apiSlice";

export const images = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getImages: builder.query<any, void>({
            query: () => `/images/approved/`
        }),
    }),
});

export const { useGetImagesQuery } = images;
