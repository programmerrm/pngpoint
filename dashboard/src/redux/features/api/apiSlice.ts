import { fetchBaseQuery, type FetchArgs } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { logout, setAuth } from "../auth/authSlice";
import type { RootState } from "../../store";
import { SERVER_URL } from "../../../utils/api";

const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, api) => {
        const token = (api.getState() as RootState).auth?.tokens?.access_token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const verifyAccessToken = async ( accessToken: string, api: any, extraOptions: any): Promise<boolean> => {
    const result = await baseQuery(
        {
            url: "/token/verify/",
            method: "POST",
            body: { token: accessToken },
        },
        api,
        extraOptions,
    );
    return !(result.error && result.error.status === 401);
};

const baseQueryWithReauth = async ( args: string | FetchArgs, api: any ,extraOptions: any ) => {
    if (typeof args === "string") {
        args = { url: args };
    }

    const state = api.getState() as RootState;
    let accessToken: string | null | undefined = state?.auth?.tokens?.access_token;
    const refreshToken: string | null | undefined = state?.auth?.tokens?.refresh_token;

    if (accessToken) {
        const isValid = await verifyAccessToken(accessToken, api, extraOptions);
        if (!isValid) {
            console.warn("Access token invalid. Will attempt refresh...");
            accessToken = undefined;
        }
    }

    let headers: Record<string, string> = {
        ...(args.headers as Record<string, string> ?? {}),
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let result = await baseQuery({ ...args, headers }, api, extraOptions);

    if (result?.error?.status === 401 && refreshToken) {
        console.warn("Access token expired. Trying to refresh...");
        const refreshResult = await baseQuery(
            {
                url: "/token/refresh/",
                method: "POST",
                body: { refresh: refreshToken },
            },
            api,
            extraOptions
        );
        if (refreshResult?.data && (refreshResult.data as { access: string })?.access) {
            accessToken = (refreshResult.data as { access: string }).access;
            api.dispatch(
                setAuth({
                    admin: state.auth.admin,
                    tokens: {
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    },
                })
            );
            headers["Authorization"] = `Bearer ${accessToken}`;
            result = await baseQuery({ ...args, headers }, api, extraOptions);
        } else {
            console.error("Refresh token expired or invalid. Logging out...");
            localStorage.removeItem("auth");
            api.dispatch(logout());
        }
    } else if (!refreshToken) {
        console.warn("No refresh token found. Logging out...");
        localStorage.removeItem("auth");
        api.dispatch(logout());
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
