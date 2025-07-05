import { apiSlice } from "../api/apiSlice";
import type { ImagesResponseType } from '../../../types/images/ImageResponseType';

export const rejectedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRejectedImages: builder.query<ImagesResponseType, void>({
            query: () => "/images/rejected/"
        }),
        getRejectedImagesLength: builder.query<any, void>({
            query: () => '/images/rejected-images-lenght/',
        }),
    }),
});

export const { useGetRejectedImagesQuery, useGetRejectedImagesLengthQuery } = rejectedApi;
