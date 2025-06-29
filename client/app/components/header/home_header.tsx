import { Link } from "react-router";
import Logo from "/pngpointwhite.png";

export default function HomeHeader() {
    return (
        <header className="relative top-0 left-0 right-0 py-4 md:py-5 w-full">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap justify-center items-center w-full">
                    <Link className="block w-fit" to={"/"}>
                        <img className="w-40 md:w-56 h-auto" src={Logo} alt="png point" loading="lazy" decoding="async" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
