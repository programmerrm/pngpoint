import React from "react";

export const Default:React.FC = () => {
    return (
        <div className="flex flex-col flex-wrap items-center justify-center space-y-20 px-10 w-full h-[82%]">
            <div className="grid grid-cols-2 gap-20 py-10 px-8 w-full rounded-sm bg-[#F4F3F9]">
                <div className="bg-[#0F1932] text-white py-10 px-8 rounded-sm">
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Total Images</span>
                        <span className="text-lg font-semibold">207</span>
                    </div>
                </div>
                <div className="bg-[#B36F30] text-white py-10 px-8 rounded-sm">
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Pending Images</span>
                        <span className="text-lg font-semibold">207</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-20 py-10 px-8 w-full rounded-sm bg-[#F4F3F9]">
                <div className="bg-[#1D8B4E] text-white py-10 px-8 rounded-sm">
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Approved Images</span>
                        <span className="text-lg font-semibold">207</span>
                    </div>
                </div>
                <div className="bg-[#AA2F27] text-white py-10 px-8 rounded-sm">
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-lg font-semibold">Rejected Images</span>
                        <span className="text-lg font-semibold">207</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
