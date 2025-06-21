import { Link } from "react-router";
import bgShape from "/images/bg-shape.jpg";
import Pagination from "../pagination/pagination";
import { ReactIcons } from "~/utils/reactIcons";
import { useGetImagesQuery } from "~/redux/features/images/imagesApi";

export default function TrendingImages() {
    const { data, isError, isLoading, isSuccess } = useGetImagesQuery();
    const { HiOutlineDownload } = ReactIcons;

    console.log(data);
    
    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-5 w-full">
                    <h2 className="text-2xl font-semibold text-center uppercase">Trending images for designers</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 basis-full">
                        {!isError && !isLoading && isSuccess && data?.images?.map((image: any) => {
                            return (
                                <Link
                                    className="flex flex-col flex-wrap justify-center items-center w-full min-h-[350px] h-auto rounded-2xl border border-gray-300 shadow-sm z-50 group relative overflow-hidden"
                                    to={`/image/${image.slug}/`}
                                    key={image.id}
                                >

                                    <div className="bg-center bg-no-repeat bg-cover opacity-0 absolute top-0 right-0 left-0 w-full h-full group-hover:opacity-100 transition-all duration-300 ease-in-out" style={{ backgroundImage: `url(${bgShape})` }}></div>

                                    <div className="flex flex-col flex-wrap justify-center items-center z-50">
                                        <img className="w-auto h-auto" src={image.url} alt={image.title} loading="lazy" decoding="async" />
                                    </div>

                                    <a
                                        href={image.url}
                                        download
                                        className="absolute top-2 right-2 text-white bg-blue-500 py-2.5 px-2.5 rounded cursor-pointer z-[999999999] scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 ease-in-out"
                                    >
                                        <HiOutlineDownload className="text-2xl" />
                                    </a>

                                    <div
                                        className="absolute bottom-0 right-0 left-0 w-full px-2.5 py-2.5 text-white/80 text-sm bg-black/80 z-50 rounded-b-2xl translate-y-full group-hover:translate-y-0 transition-all duration-400 ease-in-out"
                                    >
                                        <p className="text-sm font-normal text-center line-clamp-3">{image.title}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="flex flex-col flex-wrap items-center justify-center py-2.5 w-1/2 mx-auto">
                        <Pagination />
                    </div>
                </div>
            </div>
        </section>
    );
}


{/* <Link
                                        className="absolute top-2 right-2 text-white bg-blue-500 py-2.5 px-2.5 rounded cursor-pointer z-[999999999] scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 ease-in-out"
                                        download={image.url}
                                        to={"/"}
                                    >
                                        <HiOutlineDownload className="text-2xl" />
                                    </Link> */}