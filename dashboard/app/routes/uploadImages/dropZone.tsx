import { useDropzone } from "react-dropzone";
import ImageGrid from "./imageGrid";
import type { ImagePreviewPropsType } from "~/types/imagePreviewType";

interface Props {
    onDrop: (files: File[]) => void;
    images: ImagePreviewPropsType[];
    onImageClick: (img: ImagePreviewPropsType) => void;
}

export default function DropZone({ onDrop, images, onImageClick }: Props) {
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        noClick: true,
        noKeyboard: true,
    });

    return (
        <div
            {...getRootProps()}
            className="w-full h-full bg-[#FEFEFE] border-2 border-dashed border-gray-400 py-5 transition-all duration-300 overflow-hidden"
        >
            <input {...getInputProps()} />
            <div
                className={`flex flex-col items-center justify-center gap-y-5 w-full ${images.length > 0 ? "h-auto" : "h-full"}`}
            >
                <button
                    type="button"
                    onClick={open}
                    className="cursor-pointer px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Upload Images
                </button>
                <p className="text-gray-500 text-sm text-center mb-2">
                    or drag & drop multiple images here
                </p>
            </div>
            {images.length > 0 && (
                <ImageGrid images={images} onImageClick={onImageClick} />
            )}
        </div>
    );
}
