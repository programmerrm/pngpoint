import { ReactIcons } from "~/lib/reactIcons";
import type { MenuType } from "~/types/menuType";
const { IoIosSettings, IoMdCloudUpload, BiSolidDashboard, FiLoader, IoMdClose, AiOutlineCheck, FaImages, TbArrowsExchange, ImProfile, FaUsersCog } = ReactIcons;

export const Menu: MenuType[] = [
    {
        id: 1,
        name: "dashboard",
        path: "/",
        icon: <BiSolidDashboard className="text-2xl" />,
    },
    {
        id: 2,
        name: "Total images",
        path: "/images/",
        icon: <FaImages className="text-[21px]" />
    },
    {
        id: 3,
        name: "upload images",
        path: "/upload-images/",
        icon: <IoMdCloudUpload className="text-2xl" />
    },
    {
        id: 4,
        name: "approved images",
        path: "/approved-list/",
        icon: <AiOutlineCheck className="text-[22px]" />
    },
    {
        id: 5,
        name: "pending images",
        path: "/pending-list/",
        icon: <FiLoader className="text-2xl" />
    },
    {
        id: 6,
        name: "rejected images",
        path: "/rejected-list/",
        icon: <IoMdClose className="text-[26px]" />
    },
    {
        id: 7,
        name: "settings",
        icon: <IoIosSettings className="text-2xl" />,
        submenu: [
            {
                id: 1,
                name: "profile",
                path: "/profile/",
                icon: <ImProfile className="text-lg" />
            },
            {
                id: 2,
                name: "chnage password",
                path: "/chnage-password/",
                icon: <TbArrowsExchange className="text-2xl" />
            },
            {
                id: 3,
                name: "users",
                path: "/users/",
                icon: <FaUsersCog />
            },
        ],
    },
];
