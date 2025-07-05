import type { AdminType } from "./adminType";

export interface AuthStateType {
    admin: AdminType | null,
    tokens: {
        access_token: string | null;
        refresh_token: string | null;
    },
};
