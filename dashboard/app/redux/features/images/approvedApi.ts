import { apiSlice } from '../api/apiSlice';
import type { ImagesResponseType } from '~/types/images/ImageResponseType';

export const approvedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getApprovedImages: builder.query<ImagesResponseType, void>({
            query: () => '/images/approved/',
        }),
        getApprovedImagesLength: builder.query<any, void>({
            query: () => '/images/approved-images-lenght/',
        }),
    }),
});

export const { useGetApprovedImagesLengthQuery, useGetApprovedImagesQuery } = approvedApi;

