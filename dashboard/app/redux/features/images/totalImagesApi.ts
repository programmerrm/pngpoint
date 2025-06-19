import { apiSlice } from "../api/apiSlice";
import type { TotalImageResponseType } from "~/types/totalImageResponseType";

export const totalImages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTotalImages: builder.query<TotalImageResponseType, void>({
            query: () => "/images/total/"
        }),
    }),
});

export const { useGetTotalImagesQuery } = totalImages;
