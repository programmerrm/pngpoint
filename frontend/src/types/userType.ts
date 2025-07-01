export interface UserType {
    id: number;
    image: string | null;
    username: string;
    email: string;
    role: string;
};

export interface UserProfileType {
    image: string | null;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    number: string;
    gender: string;
    role: string;
}

export interface UserProfileUpdated {
    image: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    number: string;
    gender: string;
}