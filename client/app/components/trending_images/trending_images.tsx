import { Link } from "react-router";
import one from "/images/1.png";
import two from "/images/2.png";
import three from "/images/3.png";
import four from "/images/4.png";
import five from "/images/5.png";
import six from "/images/6.png";
import bgShape from "/images/bg-shape.jpg";
import Pagination from "../pagination/pagination";

export default function TrendingImages() {
    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-5 w-full">
                    <h2 className="text-2xl font-semibold text-center uppercase">Trending images for designers</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5.5 basis-full">
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={one} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={two} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={three} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={four} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={five} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={six} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={one} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={two} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={three} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={four} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={five} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={six} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={one} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={two} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={three} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={four} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={five} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={six} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={one} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={two} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={three} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={four} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={five} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={six} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={one} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={two} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={three} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={four} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={five} alt="" />
                        </Link>
                        <Link className="flex flex-col flex-wrap justify-center items-center rounded" to={"/"} style={{ backgroundImage: `url(${bgShape})` }}>
                            <img className="w-auto h-auto" src={six} alt="" />
                        </Link>
                    </div>
                    <div className="flex flex-col flex-wrap items-center justify-center py-2.5 w-1/2 mx-auto">
                        <Pagination />
                    </div>
                </div>
            </div>
        </section>
    );
}
