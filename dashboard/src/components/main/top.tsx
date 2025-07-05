import React from "react";
import { Link } from "react-router";
import { ReactIcons } from "../../lib/reactIcons";

export const Top: React.FC = () => {
    const { FaRegCircleUser } = ReactIcons;
    return (
        <div className="flex flex-row flex-wrap items-center justify-between h-[9%] xl:h-[10%] px-5 xl:px-10 border-b overflow-hidden bg-white border-[#d6cece]">
            <Link className="bg-white btn-style rounded-full px-12 xl:px-14 py-3.5 xl:py-4 relative border border-[#38a8e9] uppercase font-medium text-xs xl:text-sm overflow-hidden hover:text-white hover:border-black" to={"/dashboard/upload-images/"}>
                <span className="absolute inset-0 bg-black"></span>
                <span className="absolute inset-0 flex justify-center items-center font-semibold">
                    Upload
                </span>
                Upload
            </Link>
            <Link className="cursor-pointer" type="button" to={"/dashboard/profile/"}>
                <FaRegCircleUser className="text-4xl xl:text-5xl font-semibold text-[#38a8e9]" />
            </Link>
        </div>
    );
}
