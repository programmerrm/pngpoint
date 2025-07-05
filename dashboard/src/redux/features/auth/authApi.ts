import { setAuth } from "./authSlice";
import { apiSlice } from "../api/apiSlice";
import type { LoginPropsType } from "../../../types/login/loginPropsType";
import type { LoginResponseType } from "../../../types/login/loginResponseType";
import type { PasswordChangeType } from "../../../types/passwordChangeType";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addLogin: builder.mutation<LoginResponseType, LoginPropsType>({
            query: (data) => ({
                url: "/accounts/admin/login/",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const authData = {
                        admin: data.data.admin,
                        tokens: {
                            access_token: data.data.tokens.access_token,
                            refresh_token: data.data.tokens.refresh_token,
                        },
                    };
                    dispatch(setAuth(authData));
                } catch (err: any) {
                    const errorMsg = err?.error?.data?.message || "Login failed!";
                    console.error("Login time error:", errorMsg);
                }
            },
        }),
        adminPasswordChange: builder.mutation<void, PasswordChangeType>({
            query: (data) => ({
                url: "/accounts/password-change/",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useAddLoginMutation, useAdminPasswordChangeMutation } = authApi;
