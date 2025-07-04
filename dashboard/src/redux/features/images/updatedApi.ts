import { apiSlice } from '../api/apiSlice';

export const ImageUpdatedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updatedImage: builder.mutation({
            query: ({ id, data }) => ({
                url: `/images/${id}/updated/`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
        }),
    }),
});

export const { useUpdatedImageMutation } = ImageUpdatedApi;
