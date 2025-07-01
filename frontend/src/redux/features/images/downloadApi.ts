import { apiSlice } from "../api/apiSlice";

export const download = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDownload: builder.query({
            query: () => `/images/download/`,
        }),
    }),
});

export const { useGetDownloadQuery } = download;
