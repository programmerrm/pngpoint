import { apiSlice } from "../api/apiSlice";
import type { TotalImageResponseType } from "~/types/totalImageResponseType";

export const totalImages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRejectedImages: builder.query<TotalImageResponseType, void>({
            query: () => "/images/rejected/"
        }),
    }),
});

export const { useGetRejectedImagesQuery } = totalImages;
