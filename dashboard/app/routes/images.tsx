import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as exifr from "exifr";

interface ImagePreview {
    file: File;
    preview: string;
    status: "loading" | "loaded" | "error";
}

interface Metadata {
    [key: string]: any;
    title?: string | { lang: string; value: string };
    description?: string | { lang: string; value: string };
}


export default function Images() {
    const [sideBar, setSideBar] = useState<boolean>(false);
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMetadata, setSelectedMetadata] = useState<Metadata | null>(null);
    const isProcessing = useRef(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedImages: ImagePreview[] = acceptedFiles
            .filter((file) => file.type.startsWith("image/"))
            .map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                status: "loading"
            }));

        setImages((prev) => [...prev, ...selectedImages]);
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        noClick: true,
        noKeyboard: true,
    });

    const handleButtonClick = () => {
        open();
    };

    const handleImageClick = async (img: ImagePreview) => {
        console.log("Clicked image:", img.file.name);
        setSideBar(true);

        try {
            const metadata = await exifr.parse(img.file, { tiff: true, xmp: true });
            console.log("Metadata:", metadata);
            setSelectedMetadata(metadata);
        } catch (error) {
            console.error("Error reading metadata on click:", error);
            setSelectedMetadata(null);
        }
    };

    useEffect(() => {
        const processNextImage = async () => {
            if (isProcessing.current || currentIndex >= images.length) return;
            isProcessing.current = true;
            const img = images[currentIndex];
            try {
                await exifr.parse(img.file, { tiff: true, xmp: true });
                setImages((prev) => {
                    const updated = [...prev];
                    updated[currentIndex] = { ...img, status: "loaded" };
                    return updated;
                });
            } catch (error) {
                console.error("Error reading metadata:", error);
                setImages((prev) => {
                    const updated = [...prev];
                    updated[currentIndex] = { ...img, status: "error" };
                    return updated;
                });
            }
            isProcessing.current = false;
            setCurrentIndex((i) => i + 1);
        };
        processNextImage();
    }, [images, currentIndex]);

    return (
        <div className={`flex flex-col flex-wrap px-10 py-3.5 ${sideBar ? "w-[80%]" : "w-full"} h-[82%] relative`}>
            <div
                {...getRootProps()}
                className="w-full h-full bg-[#FEFEFE] border-2 border-dashed border-gray-400 py-10 transition-all duration-300 overflow-hidden"
            >
                <input {...getInputProps()} />

                <div className={`flex flex-col flex-wrap items-center justify-center gap-y-5 w-full ${images.length > 0 ? "h-auto" : "h-full"}`}>
                    <button
                        onClick={handleButtonClick}
                        className="cursor-pointer px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Upload Images
                    </button>
                    <p className="text-gray-500 text-sm text-center mb-2">
                        or drag & drop multiple images here
                    </p>
                </div>

                <div className="flex flex-col flex-wrap w-full overflow-hidden h-[550px]">
                    <div className="block w-full h-full overflow-x-hidden overflow-y-scroll scrollbar-width">
                        {images.length > 0 && (
                            <div className={`grid ${sideBar ? "grid-cols-5" : "grid-cols-6"} gap-5 py-5 px-5`}>
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center justify-center w-full rounded-md shadow-md px-2.5 py-2.5"
                                    >
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
            </div>

            {/* Sidebar with Title and Description */}
            <div className={`${sideBar ? "w-[20%] p-4 bg-gray-100 border-l" : "hidden"}`}>
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

        </div>
    );
}
