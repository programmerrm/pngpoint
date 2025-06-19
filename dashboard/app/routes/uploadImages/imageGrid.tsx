import Loader from "./loader";
import { useSelector } from "react-redux";
import type { RootState } from "~/redux/store";
import type { ImagePreviewPropsType } from "~/types/imagePreviewType";

interface Props {
    images: ImagePreviewPropsType[];
    onImageClick: (img: ImagePreviewPropsType) => void;
}

export default function ImageGrid({ images, onImageClick }: Props) {
    /* Redux Menegmnet */
    const sideBar = useSelector((state: RootState) => state.imageSideBar.sideBar);
    
    return (
        <div className="flex flex-col w-full overflow-hidden h-[590px]">
            {images.length > 0 && (
                <div className={`grid ${sideBar ? "grid-cols-5" : "grid-cols-6"} gap-5 py-2.5 px-2.5 overflow-y-scroll overflow-x-hidden scrollbar-width`}>
                    {images.map((img, index) => (
                        <div key={index} className="flex flex-col items-center shadow px-2.5 py-2.5 rounded-md">
                            {img.status === "loading" ? (
                                <Loader />
                            ) : (
                                <img
                                    onClick={() => onImageClick(img)}
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
    );
}
