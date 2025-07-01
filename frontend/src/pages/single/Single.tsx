import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as exifr from 'exifr';
import bgShape from "/images/bg-shape.jpg";
import { useGetSingleImageQuery } from "../../redux/features/singleImage/singleImage";
import { ReactIcons } from "../../utils/reactIcons";
import { SERVER_URL } from "../../utils/api";
import SingleHeader from "../../components/header/single_header";
import RelatedImages from "./related_images";
import TrendingTags from "../../components/trending_tags/trending_tags";
import Footer from "../../components/footer/footer";

export const extractImageMetadata = async (file: File) => {
    try {
        const metadata = await exifr.parse(file, { tiff: true, xmp: true });
        return metadata;
    } catch (err) {
        console.error('Metadata extraction failed:', err);
        return null;
    }
}

export default function Single() {
    const [dimensions, setDimensions] = useState<{ width: number, height: number } | null>(null);
    const [fileSize, setFileSize] = useState<number | null>(null);
    const { slug } = useParams<{ slug: string }>();
    const { data, isLoading, isError } = useGetSingleImageQuery(slug!, {
        skip: !slug,
    });
    const image = data?.image;
    const images = data?.images;

    const { FaXTwitter, FaFacebook, FaPinterest, FaInstagram, HiOutlineDownload, IoInformationCircleOutline, PiImageSquareLight, AiOutlineFileText } = ReactIcons;


    useEffect(() => {
        if (!image?.url) return;
        const img = new Image();
        img.src = image.url;
        img.onload = () => {
            setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        };
        fetch(image.url, { method: 'HEAD' })
            .then(res => {
                const length = res.headers.get('Content-Length');
                if (length) {
                    setFileSize(parseInt(length));
                }
            })
            .catch(err => {
                console.error("Failed to fetch file size", err);
            });

    }, [image?.url]);

    const formatFileSize = (bytes: number | null) => {
        if (bytes === null) return "--";
        if (bytes < 1024) return bytes + " B";
        else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    const handleDownloadImage = (id: string) => {
        const url = `${SERVER_URL}/images/download/${id}/`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError || !image) return <div>Error loading image data.</div>;

    console.log("kw", image.keywords);

    return (
        <section className="relative top-0 left-0 right-0 w-full">
            <SingleHeader />
            <section className="relative top-0 left-0 right-0 py-5 w-full bg-white">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">

                    <div className="grid justify-between grid-cols-1 md:grid-cols-[60%_35%] lg:grid-cols-[60%_35%] xl:grid-cols-[55%_35%] gap-5 lg:gap-10 w-full">

                        <div className="flex flex-col flex-wrap gap-y-2.5 md:gap-y-5 w-full">

                            {/* <div className="flex flex-col flex-wrap border border-gray-300 rounded-2xl px-2.5 py-2.5 w-full">
                                <h2 className="text-black/80 text-base md:text-xl font-medium">{image.title}</h2>
                            </div> */}

                            <div className="relative rounded-2xl border border-gray-300 cursor-pointer shadow-sm group">
                                <div
                                    className="flex flex-col flex-wrap justify-center items-center w-full h-full z-50 relative overflow-hidden"
                                >
                                    <div className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute top-0 right-0 left-0 w-full h-full group-hover:opacity-100 transition-all duration-300 ease-in-out" style={{ backgroundImage: `url(${bgShape})` }}></div>
                                    <div className="flex flex-col flex-wrap justify-center items-center z-50">
                                        <img className="w-auto max-h-[350px] md:max-h-[500px]" src={image.url} alt={image.title} loading="lazy" decoding="async" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col flex-wrap gap-y-5 lg:gap-y-10 w-full">

                            <div className="flex flex-col flex-wrap border border-gray-300 rounded px-2.5 py-2.5 w-full">
                                <h2 className="text-black/80 text-base md:text-lg lg:text-xl font-medium">{image.title}</h2>
                            </div>

                            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">

                                <div className="flex flex-row flex-wrap items-center py-2 md:py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <IoInformationCircleOutline className="text-2xl md:text-3xl" />
                                    <span className="text-sm font-normal">PNG Info</span>
                                </div>

                                {/* Dimensions */}
                                <div className="flex flex-row flex-wrap items-center justify-between py-2 md:py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <div className="flex flex-row flex-wrap items-center gap-x-2.5">
                                        <AiOutlineFileText className="text-2xl md:text-3xl" />
                                        <span className="text-sm font-normal">Dimensions</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-normal">{dimensions ? `${dimensions.width} × ${dimensions.height}` : "Loading..."}</span>
                                    </div>
                                </div>

                                {/* File Size */}
                                <div className="flex flex-row flex-wrap items-center justify-between py-2 md:py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <div className="flex flex-row flex-wrap items-center gap-x-2.5">
                                        <AiOutlineFileText className="text-2xl md:text-3xl" />
                                        <span className="
                                        text-sm font-normal">File Size</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-normal">{formatFileSize(fileSize)}</span>
                                    </div>
                                </div>

                                {/* MIME Type (hardcoded PNG for now) */}
                                <div className="flex flex-row flex-wrap items-center justify-between py-2 md:py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <div className="flex flex-row flex-wrap items-center gap-x-2.5">
                                        <PiImageSquareLight className="text-2xl md:text-3xl" />
                                        <span className="text-sm font-normal">MIME Type</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-normal">image/png</span>
                                    </div>
                                </div>
                            </div>

                            <button className="flex flex-row flex-wrap items-center gap-x-2.5 w-fit py-3 md:py-3.5 px-4 md:px-5 cursor-pointer text-sm md:tyext-base text-white bg-[#0077A2] rounded" type="button" onClick={() => handleDownloadImage(image.id)}>
                                <HiOutlineDownload className="text-xl md:text-2xl" />
                                <span>Free Download ({formatFileSize(fileSize)})</span>
                            </button>

                            {/* <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                                <h4 className="text-black/80 text-base md:text-xl font-semibold uppercase text-center">PNG keywords</h4>
                                <div className="flex flex-row flex-wrap items-center justify-center md:justify-normal w-full lg:w-4/5 mx-auto gap-2.5">
                                    {image.keywords?.map((item: any) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className="py-1 md:py-1.5 px-2.5 md:px-4 rounded bg-[#e8eaf0] cursor-pointer"
                                        >
                                            <span className="text-xs md:text-sm font-medium">{item.name.replace(/[\[\]']+/g, "")}</span>
                                        </button>
                                    ))}
                                </div>
                            </div> */}



                            <div className="flex flex-row flex-wrap items-center gap-x-5 lg:gap-x-10">
                                <Link className="text-white bg-[#1877F2] rounded-full p-2" to={""}>
                                    <FaFacebook className="text-xl md:text-[22px]" />
                                </Link>
                                <Link className="bg-[#111111] text-white rounded-full p-2" to={""}>
                                    <FaPinterest className="text-xl md:text-[22px]" />
                                </Link>
                                <Link className="bg-[#1da1f2] text-white rounded-full p-2" to={""}>
                                    <FaXTwitter className="text-xl md:text-[22px]" />
                                </Link>
                                <Link className="bg-[#FCAF45] text-white rounded-full p-2" to={""}>
                                    <FaInstagram className="text-xl md:text-[22px]" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <RelatedImages images={images} />
            <TrendingTags />
            <Footer />
        </section>
    );
}
