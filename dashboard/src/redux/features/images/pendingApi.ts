import type { ImagesResponseType } from '../../../types/images/ImageResponseType';
import { apiSlice } from '../api/apiSlice';

export const pendingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPendingImages: builder.query<ImagesResponseType, void>({
            query: () => '/images/pending/',
        }),
        getPendingImagesLength: builder.query<any, void>({
            query: () => '/images/pending-images-lenght/',
        }),
    }),
});

export const { useGetPendingImagesLengthQuery, useGetPendingImagesQuery } = pendingApi;
