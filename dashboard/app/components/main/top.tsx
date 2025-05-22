import type React from "react";
import { Link } from "react-router";
import { ReactIcons } from "~/lib/reactIcons";

export const Top:React.FC = () => {
    const { FaRegCircleUser } = ReactIcons;
    return (
        <div className="flex flex-row flex-wrap items-center justify-between w-full h-[10%] bg-white px-10 border-b-2 border-[#686464]">
            <Link className="px-10 py-2.5 border-2 border-[#47B9F0] rounded-full cursor-pointer" to={"/images/"}>Upload</Link>
            <button className="cursor-pointer" type="button">
                <FaRegCircleUser className="text-5xl font-semibold text-[#38a8e9]" />
            </button>
        </div>
    );
}
