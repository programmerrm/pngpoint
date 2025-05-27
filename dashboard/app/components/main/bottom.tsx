import type React from "react";
import { Link } from "react-router";

export const Bottom:React.FC = () => {
    return (
        <div className="flex flex-col flex-wrap justify-center items-center px-10 w-full h-[8%] border-t border-[#d6cece]">
            <p className="text-[15px] font-normal">© PNG Point 2025. All Rights Reserved. Developed by <Link className="text-[#2c7faf] font-medium" to={"https://dreamlabit.com"} target="_blank">Dreamlabit</Link></p>
        </div>
    );
}
