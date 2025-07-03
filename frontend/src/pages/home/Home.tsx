import Footer from "../../components/footer/footer";
import HomeHeader from "../../components/header/home_header";
import Scrollbar from "../../components/scrollbar/scrollbar";
import SearchingImage from "../../components/searching_image/searching_image";
import TrendingImages from "../../components/trending_images/trending_images";
import TrendingTags from "../../components/trending_tags/trending_tags";

export default function Home() {
    return (
        <section className="relative top-0 left-0 right-0 w-full">
            <HomeHeader />
            <SearchingImage />
            <TrendingImages />
            <TrendingTags />
            <Footer />
            <Scrollbar />
        </section>
    );
}