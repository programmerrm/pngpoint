import { useState, useEffect } from "react";
import ImageTopBar from "~/components/imagetopbar/imagetopbar";
import Imagesidebar from "~/components/sidebar/imagesidebar";
import { ReactIcons } from "~/lib/reactIcons";
import { useGetTotalImagesQuery } from "~/redux/features/imageupload/totalimageApi";
import type { TotalMetaDataResponseType } from "~/types/totalImageResponseType";

export default function Images() {
    const [sideBar, setSideBar] = useState<boolean>(false);
    const [selectedMetadata, setSelectedMetadata] = useState<TotalMetaDataResponseType>();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const { FaTag, IoMdClose, FaCircleUser } = ReactIcons;

    const { data } = useGetTotalImagesQuery();
    const images = data?.total_images || [];
    const count = images.length;

    const handleImageClick = (image: TotalMetaDataResponseType) => {
        setSideBar(true);
        setSelectedMetadata(image);
        toggleImageSelection(image.id.toString());
    };

    const handleSelectAllChange = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedImages(images.map((img: any) => img.id.toString()));
        } else {
            setSelectedImages([]);
        }
    };

    const toggleImageSelection = (id: string) => {
        setSelectedImages(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const allSelected = selectedImages.length === images.length && images.length > 0;
        if (selectAll !== allSelected) {
            setSelectAll(allSelected);
        }
    }, [selectedImages, images]);

    return (
        <div className="flex flex-col flex-wrap px-10 pb-3.5 h-[82%] relative">
            <ImageTopBar count={count} selectAll={selectAll} onSelectAllChange={handleSelectAllChange} />
            <div className="flex flex-row flex-wrap justify-between w-full overflow-hidden h-[93%]">
                <div className={`flex flex-wrap items-center ${sideBar ? "w-[79%]" : "w-full"} h-full overflow-x-hidden overflow-y-scroll scrollbar-width`}>
                    <div className={`grid ${sideBar ? "grid-cols-5" : "grid-cols-6"} gap-5 py-5 w-full`}>
                        {images.map((item: TotalMetaDataResponseType) => (
                            <div
                                className="flex flex-col items-center shadow-sm px-2.5 py-2.5 rounded-md border relative"
                                key={item.id}
                            >
                                <input
                                    className="absolute top-2 right-2"
                                    type="checkbox"
                                    checked={selectedImages.includes(item.id.toString())}
                                    onChange={() => toggleImageSelection(item.id.toString())}
                                />
                                <img
                                    className="w-full h-52 object-contain rounded-md cursor-pointer"
                                    src={item.url}
                                    alt=""
                                    onClick={() => handleImageClick(item)}
                                />
                                <div className="flex flex-row flex-wrap items-center justify-between absolute bottom-0 right-0 left-0 w-full py-2.5 px-2.5 bg-black/10 rounded-b-md z-50">
                                    <div className="flex flex-row flex-wrap items-center gap-x-1 text-gray-400">
                                        <FaTag className="text-sm" />
                                        <span className="text-sm">{item.cloudflareImageKeywords.length}</span>
                                    </div>
                                    <div className="flex flex-col flex-wrap relative group">
                                        {item.user?.image ? (
                                            <img src={item.user?.image} alt={item.user?.username} />
                                        ) : (
                                            <div className="block">
                                                <FaCircleUser className="text-2xl cursor-pointer" />
                                                <span className="absolute top-[-40px] left-[15px] bg-stone-300 px-5 py-1 rounded text-base font-normal capitalize opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out z-50">
                                                    {item.user?.username}
                                                </span>
                                            </div>
                                        )}
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
                    <div className="block w-[20%] h-full relative overflow-hidden">
                        <button
                            className="absolute top-1 right-1 p-0.5 z-50 bg-black text-white rounded-full cursor-pointer"
                            type="button"
                            onClick={() => {
                                setSideBar(false);
                                setSelectedImages([]);
                                setSelectAll(false);
                            }}
                        >
                            <IoMdClose className="text-xl" />
                        </button>
                        <Imagesidebar selectedMetadata={selectedMetadata} />
                    </div>
                )}
            </div>
        </div>
    );
}
