import type React from "react";
import { Link } from "react-router";
import { ReactIcons } from "~/lib/reactIcons";

export const Top: React.FC = () => {
    const { FaRegCircleUser } = ReactIcons;
    return (
        <div className="flex flex-row flex-wrap items-center justify-between w-full h-[10%] bg-white px-10 border-b border-[#d6cece]">
            <Link className="bg-white btn-style rounded-full px-14 py-4 relative border border-[#38a8e9] uppercase font-medium text-sm overflow-hidden hover:text-white hover:border-black" to={"/upload-images/"}>
                <span className="absolute inset-0 bg-black"></span>
                <span className="absolute inset-0 flex justify-center items-center font-semibold">
                    Upload
                </span>
                Upload
            </Link>
            <Link className="cursor-pointer" type="button" to={"/profile/"}>
                <FaRegCircleUser className="text-5xl font-semibold text-[#38a8e9]" />
            </Link>
        </div>
    );
}
