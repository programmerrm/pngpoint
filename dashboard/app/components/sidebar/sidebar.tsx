import React, { useState } from "react";
import { Link } from "react-router";
import { Menu } from "~/utils/menu";
import { Logout } from "../logout/logout";
import PPLogo from "/PP-logo-white.png";

export const Sidebar: React.FC = () => {
    const defaultOpenId = Menu.find((item) => item.submenu)?.id ?? null;
    const [openMenuId, setOpenMenuId] = useState<number | null>(defaultOpenId);

    const toggleSubmenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <div className="flex flex-col w-full h-full py-2.5 px-5 space-y-5 text-white bg-[#0077A2]">
            <Link className="w-40 h-auto block" to={"/"}>
                <img className="w-fit h-auto" src={PPLogo} alt="png-point" />
            </Link>
            <div className="flex flex-col flex-wrap space-y-5">
                {Menu.map((item) => (
                    <li
                        className="flex flex-row flex-wrap items-center list-none"
                        key={item.id}
                    >
                        {item.submenu ? (
                            <>
                                <button
                                    className="w-full text-left capitalize text-lg font-medium cursor-pointer hover:underline"
                                    onClick={() => toggleSubmenu(item.id!)}
                                >
                                    {item.name}
                                </button>
                                {openMenuId === item.id && (
                                    <ul className="ml-5 mt-2.5 space-y-2.5">
                                        {item.submenu.map((sub) => (
                                            <li className="list-disc" key={sub.id}>
                                                <Link
                                                    to={sub.path!}
                                                    className="block text-base font-medium capitalize hover:underline"
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="list-disc">
                                            <Logout style={"text-base font-medium hover:underline"} />
                                        </li>
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link
                                to={item.path!}
                                className="capitalize block text-lg font-medium w-fit hover:underline"
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </div>
        </div>
    );
};
