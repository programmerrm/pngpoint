import React from "react";
import { Link } from "react-router";
import { useGetTotalImagesQuery } from "~/redux/features/images/totalImagesApi";

export const Default:React.FC = () => {
    const { data: totalImages } = useGetTotalImagesQuery();
    return (
        <div className="flex flex-col flex-wrap items-center justify-center space-y-20 w-full h-full">
            <div className="grid grid-cols-2 gap-20 py-10 px-8 w-full rounded-sm bg-[#F4F3F9]">
                <Link className="bg-[#0F1932] text-white py-10 px-8 rounded-sm" to={"/total-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Total Images</span>
                        <span className="text-lg font-semibold">{totalImages?.images?.length}</span>
                    </div>
                </Link>
                <Link className="bg-[#B36F30] text-white py-10 px-8 rounded-sm" to={"/pending-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Pending Images</span>
                        <span className="text-lg font-semibold">207</span>
                    </div>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-20 py-10 px-8 w-full rounded-sm bg-[#F4F3F9]">
                <Link className="bg-[#1D8B4E] text-white py-10 px-8 rounded-sm" to={"/approved-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Approved Images</span>
                        <span className="text-lg font-semibold">207</span>
                    </div>
                </Link>
                <Link className="bg-[#AA2F27] text-white py-10 px-8 rounded-sm" to={"/rejected-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Rejected Images</span>
                        <span className="text-lg font-semibold">207</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
