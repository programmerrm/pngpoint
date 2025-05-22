import type { AuthResponseType } from "~/types/authResponseType";
import { apiSlice } from "../api/apiSlice";
import { setAuth } from "./authSlice";
import type { LoginPropsType } from "~/types/loginType";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addLogin: builder.mutation<AuthResponseType, LoginPropsType>({
            query: (data) => ({
                url: "/accounts/admin/login/",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const authData = {
                        admin: data.admin,
                        tokens: {
                            access_token: data.tokens.access_token,
                            refresh_token: data.tokens.refresh_token,
                        },
                    };
                    dispatch(setAuth(authData));
                } catch (err: any) {
                    const errorMsg = err?.error?.data?.message || "Login failed!";
                    console.error("Login time error:", errorMsg);
                }
            },
        }),
    }),
});

export const { useAddLoginMutation } = authApi;
