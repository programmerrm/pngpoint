import { Link, useParams } from "react-router";
import Footer from "~/components/footer/footer";
import TrendingTags from "~/components/trending_tags/trending_tags";
import { useGetSingleImageQuery } from "~/redux/features/singleImage/singleImage";
import RelatedImages from "./related_images";
import bgShape from "/images/bg-shape.jpg";
import SingleHeader from "~/components/header/single_header";
import { ReactIcons } from "~/utils/reactIcons";

export default function Single() {
    const { slug } = useParams<{ slug: string }>();
    const { data, isLoading, isError } = useGetSingleImageQuery(slug!, {
        skip: !slug,
    });

    const image = data?.image;
    const images = data?.images;

    const { FaXTwitter, FaFacebook, FaPinterest, FaInstagram, HiOutlineDownload, IoInformationCircleOutline,PiImageSquareLight, AiOutlineFileText } = ReactIcons;

    return (
        <section className="relative top-0 left-0 right-0 w-full">
            <SingleHeader />
            <section className="relative top-0 left-0 right-0 py-10 w-full bg-white">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <div className="grid justify-between grid-cols-[50%_34%] gap-10 w-full">

                        <div className="flex flex-col flex-wrap gap-y-5 w-full">
                            <div className="flex flex-col flex-wrap border border-gray-300 rounded-2xl px-2.5 py-2.5 w-full">
                                <h2 className="text-black/80 text-xl font-medium">{image?.title}</h2>
                            </div>
                            <div className="relative rounded-2xl border border-gray-300 cursor-pointer shadow-sm group">
                                <div
                                    className="flex flex-col flex-wrap justify-center items-center w-full h-full z-50 relative overflow-hidden"
                                >
                                    <div className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute top-0 right-0 left-0 w-full h-full group-hover:opacity-100 transition-all duration-300 ease-in-out" style={{ backgroundImage: `url(${bgShape})` }}></div>
                                    <div className="flex flex-col flex-wrap justify-center items-center z-50">
                                        <img className="w-auto max-h-[500px]" src={image?.url} alt={image?.title} loading="lazy" decoding="async" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col flex-wrap gap-y-10 w-full">

                            <div className="flex flex-col flex-wrap gap-y-2.5 w-full">
                                <div className="flex flex-row flex-wrap items-center py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <IoInformationCircleOutline className="text-3xl" />
                                    <span>PNG Info</span>
                                </div>


                                <div className="flex flex-row flex-wrap items-center justify-between py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <div className="flex flex-row flex-wrap items-center gap-x-2.5">
                                        <AiOutlineFileText className="text-3xl" />
                                        <span>Dimensions</span>
                                    </div>
                                    <div>
                                        <span>884 * 800</span>
                                    </div>
                                </div>

                                <div className="flex flex-row flex-wrap items-center justify-between py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <div className="flex flex-row flex-wrap items-center gap-x-2.5">
                                        <AiOutlineFileText className="text-3xl" />
                                        <span>File Size</span>
                                    </div>
                                    <div>
                                        <span>8.85 MB</span>
                                    </div>
                                </div>

                                <div className="flex flex-row flex-wrap items-center justify-between py-2.5 px-1.5 gap-x-2.5 rounded w-full border border-gray-300 shadow-sm">
                                    <div className="flex flex-row flex-wrap items-center gap-x-2.5">
                                        <PiImageSquareLight className="text-3xl" />
                                        <span>MIME Type</span>
                                    </div>
                                    <div>
                                        <span>Image/png</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col flex-wrap w-full">
                                <h4 className="text-black/80 text-xl font-semibold uppercase text-center">PNG keywords</h4>

                                <div className="flex flex-row flex-wrap items-center justify-center w-full lg:w-4/5 mx-auto gap-2.5">

                                    {image?.keywords?.map((item: any) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className="py-1.5 px-4 rounded bg-[#e8eaf0] cursor-pointer"
                                        >
                                            <span className="text-sm font-medium">{item.name.replace(/[\[\]']+/g, "")}</span>
                                        </button>
                                    ))}

                                </div>
                            </div>

                            <button className="flex flex-row flex-wrap items-center gap-x-2.5 w-fit py-3.5 px-5 cursor-pointer text-white bg-[#0077A2] rounded" type="buttton">
                                <HiOutlineDownload className="text-2xl" />
                                <span>Free Download (8.85 MB)</span>
                            </button>

                            <div className="flex flex-row flex-wrap items-center gap-x-10">
                                <Link to={""}>
                                    <FaFacebook className="text-[22px]" />
                                </Link>
                                <Link to={""}>
                                    <FaPinterest className="text-[22px]" />
                                </Link>
                                <Link to={""}>
                                    <FaXTwitter className="text-[22px]" />
                                </Link>
                                <Link to={""}>
                                    <FaInstagram className="text-[22px]" />
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
