export interface KeywordResponseType {
    id: number;
    cloudflareImageModel: number;
    name: string;
};

export interface UserResponseType {
    id: number;
    image: null | string;
    username: string;
    slug: string;
    email: string;
    number: string;
    first_name: string;
    last_name: string;
    role: string;
};

export interface MetaDataResponseType {
    selectedMetadata: {
        id: number;
        url: string;
        image_id: string;
        title: string;
        description: string;
        category: string;
        status: string;
        cloudflareImageKeywords: KeywordResponseType[] | [];
        user: UserResponseType;
    };
}
