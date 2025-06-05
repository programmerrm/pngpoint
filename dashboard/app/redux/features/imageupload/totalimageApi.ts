import { apiSlice } from "../api/apiSlice";

export const totalImage = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTotalImages: builder.query<any, void>({
            query: () => "/image-upload/images/total/"
        }),
    }),
});

export const { useGetTotalImagesQuery } = totalImage;
