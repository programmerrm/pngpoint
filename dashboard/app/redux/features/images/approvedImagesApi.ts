import { apiSlice } from "../api/apiSlice";
import type { TotalImageResponseType } from "~/types/totalImageResponseType";

export const totalImages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getApprovedImages: builder.query<TotalImageResponseType, void>({
            query: () => "/images/approved/"
        }),
    }),
});

export const { useGetApprovedImagesQuery } = totalImages;
