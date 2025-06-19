import { apiSlice } from "../api/apiSlice";
import type { TotalImageResponseType } from "~/types/totalImageResponseType";

export const totalImages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPendingImages: builder.query<TotalImageResponseType, void>({
            query: () => "/images/pending/"
        }),
    }),
});

export const { useGetPendingImagesQuery } = totalImages;
