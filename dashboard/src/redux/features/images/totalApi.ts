import type { ImagesResponseType } from '../../../types/images/ImageResponseType';
import { apiSlice } from '../api/apiSlice';

export const totalApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTotalImages: builder.query<ImagesResponseType, void>({
            query: () => '/images/total/',
        }),
        getTotalImagesLength: builder.query<any, void>({
            query: () => '/images/total-images-lenght/',
        }),
    }),
});

export const { useGetTotalImagesLengthQuery, useGetTotalImagesQuery } = totalApi;
