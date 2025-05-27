import type { AdminProfileType, AdminProfileUpdated } from "~/types/adminType";
import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminProfile: builder.query<AdminProfileType[], void>({
            query: () => "/accounts/admin/profile/",
        }),
        adminProfileUpdated: builder.mutation<void, AdminProfileUpdated>({
            query: (data) => ({
                url: "/accounts/admin-profile/updated/",
                body: data,
                method: "PUT",
            }),
        }),
    }),
});

export const { useGetAdminProfileQuery, useAdminProfileUpdatedMutation } = adminApi;
