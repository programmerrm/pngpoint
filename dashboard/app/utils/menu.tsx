import type { MenuType } from "~/types/menuType";

export const Menu: MenuType[] = [
    {
        id: 1,
        name: "dashboard",
        path: "/",
    },
    {
        id: 2,
        name: "upload images",
        path: "/images/",
    },
    {
        id: 3,
        name: "approved images",
        path: "/approved-list/",
    },
    {
        id: 4,
        name: "pending images",
        path: "/pending-list/",
    },
    {
        id: 5,
        name: "rejected images",
        path: "/rejected-list/",
    },
    {
        id: 6,
        name: "add category",
        path: "/add-category/",
    },
    {
        id: 7,
        name: "categories",
        path: "/categories/",
    },
    {
        id: 8,
        name: "settings",
        submenu: [
            {
                id: 1,
                name: "profile",
                path: "/profile/",
            },
            {
                id: 1,
                name: "chnage password",
                path: "/chnage-password/",
            },
            {
                id: 2,
                name: "users",
                path: "/users/",
            },
        ],
    },
];
