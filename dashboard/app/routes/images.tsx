import React, { useRef, useState } from "react";

interface ImagePreview {
    file: File;
    preview: string;
}

export default function Images() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<ImagePreview[]>([]);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const selectedImages: File[] = Array.from(files).filter(file =>
            file.type.startsWith("image/")
        );

        const previews: ImagePreview[] = selectedImages.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages(prev => [...prev, ...previews]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col flex-wrap px-10 py-3.5 w-full h-[82%] relative overflow-hidden">

            <div onDrop={handleDrop} onDragOver={handleDragOver} className="flex flex-col w-full h-full bg-[#FEFEFE] border-2 border-dashed border-gray-400 py-10 transition-all duration-300 overflow-scroll scrollbar-width">

                <div className={`flex flex-col flex-wrap items-center justify-center gap-y-5 w-full ${images.length > 0 ? "h-auto" : "h-full"}`}>
                    <button
                        onClick={handleButtonClick}
                        className="cursor-pointer px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Upload Images
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <p className="text-gray-500 text-sm text-center mb-2">
                        or drag & drop multiple images here
                    </p>
                </div>


                <div className="flex flex-col flex-wrap w-full">
                    {images.length > 0 && (
                        <div className="grid grid-cols-6 gap-5 py-5 px-5">
                            {images.map((img, index) => (
                                <div className="flex flex-col flex-wrap w-full rounded-md shadow-md px-2.5 py-2.5" key={index}>
                                    <img
                                        src={img.preview}
                                        alt={`uploaded-${index}`}
                                        className="w-full h-52 object-contain rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>

        </div>
    );
}
