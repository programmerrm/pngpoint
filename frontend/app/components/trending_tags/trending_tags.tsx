import { useState } from "react";
import { useDispatch } from "react-redux";
import { setKeyword } from "~/redux/features/getImages/getImageSlice";
import { useGetKeywordsQuery } from "~/redux/features/keywords/keywordsApi";

export default function TrendingTags() {
    const [visibleCount, setVisibleCount] = useState<number>(30);
    const { data, isError, isLoading, isSuccess } = useGetKeywordsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 30);
    };

    const dispatch = useDispatch();

    const handleTagClick = (keyword: string) => {
        dispatch(setKeyword(keyword));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    const tags = isSuccess && data?.data?.length > 0 ? data.data.slice(0, visibleCount) : [];

    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-2.5 md:gap-y-4 w-full">
                    <h4 className="text-black/80 text-sm md:text-base font-semibold text-center capitalize">
                        Trending Tags Today
                    </h4>
                    <div className="flex flex-row flex-wrap items-center justify-center w-full gap-1.5 md:gap-2.5">
                        {tags.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleTagClick(item.name)}
                                className="py-1 md:py-1.5 px-2.5 md:px-4 rounded bg-[#e8eaf0] cursor-pointer"
                            >
                                <span className="text-xs md:text-sm font-medium">
                                    {item.name.replace(/[\[\]']+/g, "")}
                                </span>
                            </button>
                        ))}
                    </div>
                    {isSuccess && visibleCount < data.data.length && (
                        <div className="w-full flex justify-center pt-2.5 md:pt-4">
                            <button
                                onClick={handleShowMore}
                                className="text-sm md:text-base cursor-pointer px-4 md:px-6 py-2 md:py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
