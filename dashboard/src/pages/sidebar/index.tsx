import React, { useState } from "react";
import { Link } from "react-router-dom";
import PPLogo from "/PP-logo-white.png";
import { Menu } from "../../utils/menu";
import { Logout } from "../../components/logout/logout";

export const Sidebar: React.FC = () => {
    const defaultOpenId = Menu.find((item) => item.submenu)?.id ?? null;
    const [openMenuId, setOpenMenuId] = useState<number | null>(defaultOpenId);

    const toggleSubmenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <div className="flex flex-col h-full py-2.5 px-5 space-y-5 overflow-y-scroll overflow-x-hidden scrollbar-width text-white bg-[#0077A2]">
            <Link className="w-20 lg:w-28 xl:w-40 h-auto block" to={"/dashboard/"}>
                <img className="w-fit h-auto" src={PPLogo} alt="png-point" />
            </Link>
            <div className="flex flex-col flex-wrap space-y-8">
                {Menu.map((item) => (
                    <li
                        className="flex flex-row flex-wrap items-center list-none"
                        key={item.id}
                    >
                        {item.submenu ? (
                            <React.Fragment>
                                <div className="flex flex-row flex-wrap items-center gap-x-2">
                                    {item.icon && (<React.Fragment>{item.icon}</React.Fragment>)}
                                    <div className="w-fit relative group">
                                        <button
                                            className="w-fit text-left capitalize text-sm xl:text-base font-medium cursor-pointer"
                                            onClick={() => toggleSubmenu(item.id!)}
                                        >
                                            {item.name}
                                        </button>
                                        <span className="absolute bottom-[-2px] left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </div>
                                </div>
                                {openMenuId === item.id && (
                                    <ul className="flex flex-col flex-wrap ml-7 mt-3.5 space-y-3.5">
                                        {item.submenu.map((sub: any) => (
                                            <li className="list-disc w-fit relative group" key={sub.id}>
                                                <Link
                                                    to={sub.path!}
                                                    className="block text-sm xl:text-base font-medium capitalize"
                                                >
                                                    {sub.name}
                                                </Link>
                                                <span className="absolute bottom-[-2px] left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                        ))}
                                        <li className="list-disc w-fit relative group">
                                            <Logout style={"text-sm xl:text-base font-medium"} />
                                            <span className="absolute bottom-[-2px] left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                        </li>
                                    </ul>
                                )}
                            </React.Fragment>
                        ) : (
                            <div className="flex flex-row flex-wrap items-center gap-x-2 relative">
                                {item.icon && <>{item.icon}</>}
                                <Link
                                    to={item.path!}
                                    className="capitalize block text-sm xl:text-base font-medium w-fit relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-[-2px] left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>
                        )}
                    </li>
                ))}
            </div>
        </div>
    );
};
