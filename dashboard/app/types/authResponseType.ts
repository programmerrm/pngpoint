export interface AuthResponseType {
    admin: {
        id: number;
        image: string;
        email: string;
        username: string;
        role: string;
    };
    tokens: {
        access_token: string;
        refresh_token: string;
    };
};
