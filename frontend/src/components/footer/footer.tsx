import { Link } from "react-router-dom";
import Logo from "/pngpointwhite.png";
import { ReactIcons } from "../../utils/reactIcons";

export default function Footer() {
    const { FaXTwitter, FaFacebook, FaPinterest, FaInstagram } = ReactIcons;
    return (
        <footer className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full text-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
                    <div className="flex flex-col flex-wrap gap-y-4 md:gap-y-5 w-full">
                        <Link className="block w-fit" to={"/"}>
                            <img className="w-40 lg:w-44 xl:w-52 h-auto" src={Logo} alt="pnp point" loading="lazy" decoding="async" />
                        </Link>
                        <p className="text-xs xl:text-sm font-medium uppercase">free download transparent png files no copyright</p>
                        <div className="flex flex-row flex-wrap items-center gap-x-3.5 md:gap-x-8 mt-2.5">
                            <Link to={"/"}>
                                <FaXTwitter className="text-xl xl:text-[22px]" />
                            </Link>
                            <Link to={"/"}>
                                <FaFacebook className="text-xl xl:text-[22px]" />
                            </Link>
                            <Link to={"/"}>
                                <FaPinterest className="text-xl xl:text-[22px]" />
                            </Link>
                            <Link to={"/"}>
                                <FaInstagram className="text-xl xl:text-[22px]" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap w-full">
                        <h4 className="text-base lg:text-lg xl:text-xl font-semibold uppercase">Resources</h4>
                        <ul className="flex flex-col flex-wrap gap-y-2.5 md:gap-y-3 mt-2.5 md:mt-5 ml-4.5">
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>collections</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>featured</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>latest</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/contributor/auth/"}>contributor login</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col flex-wrap w-full">
                        <h4 className="text-base lg:text-lg xl:text-xl font-semibold uppercase">Company</h4>
                        <ul className="flex flex-col flex-wrap gap-y-2.5 md:gap-y-3 mt-2.5 md:mt-5 ml-4.5">
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>about us</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>contact</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>terms</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>privacy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col flex-wrap w-full">
                        <h4 className="text-base lg:text-lg xl:text-xl font-semibold uppercase">Community</h4>
                        <ul className="flex flex-col flex-wrap gap-y-2.5 md:gap-y-3 mt-2.5 md:mt-5 ml-4.5">
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>x</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>pinterest</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>instagram</Link>
                            </li>
                            <li className=" list-disc">
                                <Link className="block w-fit text-sm xl:text-base font-normal uppercase" to={"/"}>facebook</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
