export interface AdminType {
    id: number;
    image: string;
    username: string;
    email: string;
    role: string;
};

export interface AdminProfileType {
    image: string | null;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    number: string;
    gender: string;
    role: string;
}

export interface AdminProfileUpdated {
    image: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    number: string;
    gender: string;
}
