import { Link } from "react-router-dom";
import { useGetTotalImagesLengthQuery } from "../../redux/features/images/totalApi";
import { useGetApprovedImagesLengthQuery } from "../../redux/features/images/approvedApi";
import { useGetPendingImagesLengthQuery } from "../../redux/features/images/pendingApi";
import { useGetRejectedImagesLengthQuery } from "../../redux/features/images/rejectedApi";

export default function Dashboard() {
    const { data: totalImages } = useGetTotalImagesLengthQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: approvedImages } = useGetApprovedImagesLengthQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: pendingImages } = useGetPendingImagesLengthQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: rejectedImages } = useGetRejectedImagesLengthQuery(undefined, { refetchOnMountOrArgChange: true });
    return (
        <div className="flex flex-col flex-wrap items-center justify-center space-y-20 px-5 xl:px-10 w-full h-[82%]">

            <div className="grid grid-cols-2 gap-20 py-10 px-8 w-full rounded-sm bg-[#F4F3F9]">
                <Link className="bg-[#0F1932] text-white py-8 xl:py-10 px-8 rounded-sm" to={"/total-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-base xl:text-lg font-semibold">Total Images</span>
                        <span className="text-base xl:text-lg font-semibold">{totalImages?.images_lenght || 0}</span>
                    </div>
                </Link>
                <Link className="bg-[#B36F30] text-white py-8 xl:py-10 px-8 rounded-sm" to={"/pending-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-base xl:text-lg font-semibold">Pending Images</span>
                        <span className="text-base xl:text-lg font-semibold">{pendingImages?.images_lenght || 0}</span>
                    </div>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-20 py-10 px-8 w-full rounded-sm bg-[#F4F3F9]">
                <Link className="bg-[#1D8B4E] text-white py-8 xl:py-10 px-8 rounded-sm" to={"/approved-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-base xl:text-lg font-semibold">Approved Images</span>
                        <span className="text-base xl:text-lg font-semibold">{approvedImages?.images_length || 0}</span>
                    </div>
                </Link>
                <Link className="bg-[#AA2F27] text-white py-8 xl:py-10 px-8 rounded-sm" to={"/rejected-images/"}>
                    <div className="flex flex-col flex-wrap gap-y-1">
                        <span className="text-base xl:text-lg font-semibold">Rejected Images</span>
                        <span className="text-base xl:text-lg font-semibold">{rejectedImages?.images_lenght || 0}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
