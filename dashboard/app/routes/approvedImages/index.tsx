import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSideBar from "~/components/sidebar/imageSideBar/imageSideBar";
import { ReactIcons } from "~/lib/reactIcons";
import { useGetApprovedImagesQuery } from "~/redux/features/images/approvedImagesApi";
import { openSidebar, closeSidebar, setSelectedMetadata, clearSelectedMetadata } from "~/redux/features/imageSidebar/imageSideBarSlice";
import type { RootState } from "~/redux/store";
import type { MetaDataResponseType } from "~/types/metaDataResponseType";

export default function Images() {
    /* State Menegment */
    const [loading, setLoading] = useState<null | "update" | "delete">(null);
    /* Redux Menegment */
    const dispatch = useDispatch();
    const sideBar = useSelector((state: RootState) => state.imageSideBar.sideBar);
    const selectedMetadata = useSelector((state: RootState) => state.imageSideBar.selectedMetadata);
    const { data, isLoading, isError, isSuccess } = useGetApprovedImagesQuery(undefined, { refetchOnMountOrArgChange: true });
    const images = data?.images ?? [];
    const count = images.length;
    /* React icons */
    const { FaTag, IoMdClose } = ReactIcons;

    const selectedId = Number(selectedMetadata?.id);

    /* Handle image click */
    const handleImageClick = (img: any) => {
        dispatch(openSidebar());
        dispatch(setSelectedMetadata(img));
    }
    /* Handle Side Bar Close */
    const handleSideBarClose = () => {
        dispatch(closeSidebar());
        dispatch(clearSelectedMetadata());
    }

    /* Error or loading handling  */
    if (isLoading) {
        return (
            <div className="flex flex-col flex-wrap items-center justify-center h-[82%] relative">
                <div className="text-center py-10 text-gray-600">Loading images...</div>;
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex flex-col flex-wrap items-center justify-center h-[82%] relative">
                <div className="text-center py-10 text-red-600">Failed to load images.</div>;
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-wrap px-10 pb-3.5 h-[82%] relative">
            <div className="flex flex-row flex-wrap items-center justify-between h-[7%]">
                <h4 className="text-base font-medium">Approved images : {count}</h4>
            </div>
            <div className="flex flex-row flex-wrap justify-between w-full overflow-hidden h-[93%]">
                <div className={`flex flex-wrap items-center ${sideBar ? "w-[79%]" : "w-full"} h-full overflow-x-hidden overflow-y-scroll scrollbar-width`}>
                    <div className={`grid ${sideBar ? "grid-cols-5" : "grid-cols-6"} gap-5 py-5 w-full`}>
                        {!isError && !isLoading && isSuccess && images.map((item: MetaDataResponseType) => (
                            <div
                                className="flex flex-col items-center shadow-sm px-2.5 py-2.5 rounded-md border relative"
                                key={item.id}
                            >
                                <img
                                    className="w-full h-52 object-contain rounded-md cursor-pointer"
                                    src={item.url}
                                    alt=""
                                    onClick={() => handleImageClick(item)}
                                />
                                <div className="flex flex-row flex-wrap items-center justify-between absolute bottom-0 right-0 left-0 w-full py-2.5 px-2.5 bg-black/10 rounded-b-md z-50">
                                    <div className="flex flex-row flex-wrap items-center gap-x-1 text-gray-400">
                                        <FaTag className="text-sm" />
                                        <span className="text-sm">{item.keywords?.length ?? 0}</span>
                                    </div>
                                    <span
                                        className={`block w-2 h-2 rounded-full 
                                            ${item.status === "approved" ? "bg-green-600" : ""}
                                            ${item.status === "rejected" ? "bg-red-600" : ""}
                                            ${item.status === "pending" ? "bg-yellow-500" : ""}`}
                                    ></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {sideBar && selectedMetadata && (
                    <div className="w-[20%] h-full relative">
                        <button className="absolute top-0.5 right-0.5 z-50 bg-black text-white p-0.5 rounded-full cursor-pointer" type="button" onClick={handleSideBarClose}>
                            <IoMdClose className="text-lg" />
                        </button>
                        <ImageSideBar
                            selectedMetadata={selectedMetadata}
                            selectedCount={1}
                            selectedIds={[selectedId]}
                            setLoading={setLoading}
                        />
                    </div>
                )}
                {loading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white/80 flex items-center justify-center z-50 loader-animation">
                        <div className="text-center">
                            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto mb-3"></div>
                            <p className="text-gray-700 text-sm font-normal">
                                {loading === "update" ? "Updating image... Please wait" : "Deleting image... Please wait"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
