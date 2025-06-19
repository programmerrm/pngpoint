import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropZone from "./dropZone";
import { extractImageMetadata } from "./utils";
import { ReactIcons } from "~/lib/reactIcons";
import type { RootState } from "~/redux/store";
import type { ImagePreviewPropsType } from "~/types/imagePreviewType";
import type { MetaDataResponseType } from "~/types/metaDataResponseType";
import { useImageUploadMutation } from "~/redux/features/images/imageuploadApi";
import { closeSidebar, clearSelectedMetadata, openSidebar, setSelectedMetadata } from "~/redux/features/imageSidebar/imageSideBarSlice";
import ImageSideBar from "~/components/sidebar/imageSideBar/imageSidebar";

export default function Index() {
    /* State Menegment */
    const [loading, setLoading] = useState<null | "update" | "delete">(null);
    const [images, setImages] = useState<ImagePreviewPropsType[]>([]);
    const [allMetadata, setAllMetadata] = useState<MetaDataResponseType[]>([]);
    /* Redux Menegment */
    const dispatch = useDispatch();
    const sideBar = useSelector((state: RootState) => state.imageSideBar.sideBar);
    const selectedMetadata = useSelector((state: RootState) => state.imageSideBar.selectedMetadata);
    const [imageUpload] = useImageUploadMutation();

    const selectedId = Number(selectedMetadata?.id);
    const { IoMdClose } = ReactIcons;

    const accumulateMetadata = (newMeta: MetaDataResponseType[]) => {
        setAllMetadata((prev) => [...prev, ...newMeta]);
    };

    const handleDrop = useCallback(
        (files: File[]) => {
            const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                status: "loading" as const,
            }));
            setImages((prev) => [...prev, ...newImages]);

            newImages.forEach(async (img, idx) => {
                const meta = await extractImageMetadata(img.file);

                const formData = new FormData();
                formData.append("images", img.file);
                formData.append("title", meta.title);
                formData.append("description", meta.description);
                formData.append("category", meta.category);
                formData.append("keywords", JSON.stringify(meta.keywords));

                try {
                    const response = await imageUpload(formData).unwrap();
                    const uploaded = response?.images || [];
                    accumulateMetadata(uploaded);

                    setImages((prev) => {
                        const updated = [...prev];
                        const globalIndex = prev.length - newImages.length + idx;
                        updated[globalIndex] = {
                            ...img,
                            status: "loaded",
                            image_id: uploaded[0]?.image_id || null,
                        };
                        return updated;
                    });
                } catch (error) {
                    console.error("Upload failed:", error);
                    setImages((prev) => {
                        const updated = [...prev];
                        const globalIndex = prev.length - newImages.length + idx;
                        updated[globalIndex] = { ...img, status: "error" };
                        return updated;
                    });
                }
            });
        },
        [imageUpload]
    );

    const handleImageClick = (img: ImagePreviewPropsType) => {
        dispatch(openSidebar());
        const match = allMetadata.find((m) => m.image_id === img.image_id);
        if (match) dispatch(setSelectedMetadata(match));
    }

    const handleSideBarClose = () => {
        dispatch(closeSidebar());
        dispatch(clearSelectedMetadata());
    }

    return (
        <div className="flex flex-col flex-wrap items-center justify-center px-10 h-[82%] relative ei-khane-loading...">
            <div className="flex flex-row flex-wrap justify-between w-full overflow-hidden h-[95%]">
                <div className={`flex flex-wrap items-center ${sideBar ? "w-[79%]" : "w-full"} h-full overflow-x-hidden overflow-y-scroll scrollbar-width`}>
                    <DropZone
                        onDrop={handleDrop}
                        images={images}
                        onImageClick={handleImageClick}
                    />
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
            </div>
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
    );
}
