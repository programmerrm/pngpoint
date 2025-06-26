import type { Route } from "./+types/index";
import TrendingTags from "~/components/trending_tags/trending_tags";
import TrendingImages from "~/components/trending_images/trending_images";
import HomeHeader from "~/components/header/home_header";
import SearchingImage from "~/components/searching_image/searching_image";
import Footer from "~/components/footer/footer";
import Scrollbar from "~/components/scrollbar/scrollbar";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PNG - Point" },
        { name: "description", content: "Welcome to png point" },
    ];
}

export default function Index() {
    return (
        <main className="relative top-0 left-0 right-0 w-full">
            <HomeHeader />
            <SearchingImage />
            <TrendingImages />
            <TrendingTags />
            <Footer />
            <Scrollbar />
        </main>
    );
}
