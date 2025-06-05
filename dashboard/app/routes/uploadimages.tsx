import React, { useCallback, useState } from "react";
import * as exifr from "exifr";
import { useDropzone } from "react-dropzone";
import { useImageUploadMutation } from "~/redux/features/imageupload/imageuploadApi";
import type { ImagePreviewPropsType } from "~/types/imagePreviewType";

export default function Uploadimages() {
    /* State Menegment */
    const [sideBar, setSideBar] = useState<boolean>(false);
    const [images, setImages] = useState<ImagePreviewPropsType[]>([]);
    const [selectedMetadata, setSelectedMetadata] = useState<any>(null);
    /* Redux Images Uploading... */
    const [imageUpload, { error, isLoading }] = useImageUploadMutation();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages: ImagePreviewPropsType[] = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            status: "loading",
        }));

        setImages((prev) => [...prev, ...newImages]);

        newImages.forEach(async (img, index) => {
            const formData = new FormData();
            let title = "";
            let description = "";
            let category = "";
            let keywords: string[] = [];

            try {
                const metadata = await exifr.parse(img.file, { tiff: true, xmp: true });

                title =
                    metadata?.title && typeof metadata.title === "object"
                        ? metadata.title.value || ""
                        : metadata?.title || "";

                description =
                    metadata?.description && typeof metadata.description === "object"
                        ? metadata.description.value || ""
                        : metadata?.description || "";

                if (metadata?.subject && Array.isArray(metadata.subject)) {
                    category = metadata.subject[0] || "";
                    keywords = metadata.subject;
                }
            } catch (error) {
                console.error("Metadata extraction error:", error);
            }

            formData.append("images", img.file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("keywords", JSON.stringify(keywords));

            try {
                const response = await imageUpload(formData).unwrap();
                console.log("Upload success:", response);

                setImages((prev) => {
                    const updated = [...prev];
                    const globalIndex = prev.length - newImages.length + index;
                    updated[globalIndex] = { ...img, status: "loaded" };
                    return updated;
                });
            } catch (error) {
                console.error("Upload error:", error);
                setImages((prev) => {
                    const updated = [...prev];
                    const globalIndex = prev.length - newImages.length + index;
                    updated[globalIndex] = { ...img, status: "error" };
                    return updated;
                });
            }
        });
    }, [imageUpload]);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        noClick: true,
        noKeyboard: true,
    });

    /* Handle Image Click */
    const handleImageClick = async (img: ImagePreviewPropsType) => {
        setSideBar(true);
        try {
            const metadata = await exifr.parse(img.file, { tiff: true, xmp: true });
            setSelectedMetadata(metadata);
        } catch (error) {
            console.error("Metadata read error:", error);
            setSelectedMetadata(null);
        }
    };

    console.log("selectedMetadata", selectedMetadata);

    return (
        <div className={`flex flex-col flex-wrap px-10 py-3.5 ${sideBar ? "w-[80%]" : "w-full"} h-[82%] relative`}>
            <div
                {...getRootProps()}
                className="w-full h-full bg-[#FEFEFE] border-2 border-dashed border-gray-400 py-10 transition-all duration-300 overflow-hidden"
            >
                <input {...getInputProps()} />
                <div className={`flex flex-col flex-wrap items-center justify-center gap-y-5 w-full ${images.length > 0 ? "h-auto" : "h-full"}`}>
                    <button
                        onClick={open}
                        className="cursor-pointer px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Upload Images
                    </button>
                    <p className="text-gray-500 text-sm text-center mb-2">or drag & drop multiple images here</p>
                </div>

                <div className="flex flex-col flex-wrap w-full overflow-hidden h-[550px]">
                    {images.length > 0 && (
                        <div className={`grid ${sideBar ? "grid-cols-5" : "grid-cols-6"} gap-5 py-5 px-5`}>
                            {images.map((img, index) => (
                                <div key={index} className="flex flex-col items-center shadow px-2.5 py-2.5 rounded-md">
                                    {img.status === "loading" ? (
                                        <div className="w-full h-52 flex items-center justify-center">
                                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <img
                                            onClick={() => handleImageClick(img)}
                                            src={img.preview}
                                            alt={`uploaded-${index}`}
                                            className="w-full h-52 object-contain rounded-md cursor-pointer"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>





            {/* Metadata Sidebar */}
            {sideBar && (
                <div className="w-[20%] p-4 bg-gray-100 border-l overflow-y-auto">
                    <h2 className="font-semibold text-lg mb-2">
                        {
                            selectedMetadata?.title
                                ? typeof selectedMetadata.title === "object"
                                    ? selectedMetadata.title.value || "No Title Found"
                                    : selectedMetadata.title
                                : "No Title Found"
                        }
                    </h2>
                    <p>
                        {
                            selectedMetadata?.description
                                ? typeof selectedMetadata.description === "object"
                                    ? selectedMetadata.description.value || "No Description Found"
                                    : selectedMetadata.description
                                : "No Description Found"
                        }
                    </p>
                </div>
            )}



        </div>
    );
}
