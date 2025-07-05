import type React from "react";
import { Link } from "react-router-dom";

export const Bottom:React.FC = () => {
    return (
        <div className="flex flex-col flex-wrap justify-center items-center px-5 xl:px-10 h-[6%] xl:h-[8%] border-t overflow-hidden border-[#d6cece]">
            <p className="text-sm xl:text-[15px] font-normal">© PNG Point 2025. All Rights Reserved. Developed by <Link className="text-[#2c7faf] font-medium" to={"https://dreamlabit.com"} target="_blank">Dreamlabit</Link></p>
        </div>
    );
}
