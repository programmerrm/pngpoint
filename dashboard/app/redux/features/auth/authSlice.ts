import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthStateType } from "~/types/authStateType";

let initialState: AuthStateType = {
    admin: null,
    tokens: {
        access_token: null,
        refresh_token: null,
    },
};

if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        if (parsed && parsed.tokens) {
            initialState = parsed;
        }
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthStateType>) => {
            state.admin = action.payload.admin;
            state.tokens.access_token = action.payload.tokens.access_token;
            state.tokens.refresh_token = action.payload.tokens.refresh_token;
            if (typeof window !== "undefined") {
                localStorage.setItem("auth", JSON.stringify(action.payload));
            };
        },
        logout: (state) => {
            state.admin = null;
            state.tokens.access_token = null;
            state.tokens.refresh_token = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth");
            };
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
