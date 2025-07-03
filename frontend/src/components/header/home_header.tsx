import { Link } from "react-router-dom";
import Logo from "/pngpointwhite.png";
import { useDispatch } from "react-redux";
import { setCategory, setKeyword, setPage, setTitle } from "../../redux/features/getImages/getImageSlice";

export default function HomeHeader() {
    const dispatch = useDispatch();
    const handleLogo = () => {
        dispatch(setTitle(''));
        dispatch(setCategory(''))
        dispatch(setKeyword(''));
        dispatch(setPage(1));
    }
    return (
        <header className="relative top-0 left-0 right-0 py-4 md:py-5 w-full">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap justify-center items-center w-full">
                    <Link className="block w-fit" to={"/"} onClick={handleLogo}>
                        <img className="w-40 md:w-56 h-auto" src={Logo} alt="png point" loading="lazy" decoding="async" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
