import { useState } from "react";
import { useGetKeywordsQuery } from "~/redux/features/keywords/keywordsApi";

export default function TrendingTags() {
    const { data, isError, isLoading, isSuccess } = useGetKeywordsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [visibleCount, setVisibleCount] = useState(30);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 30);
    };

    const tags = isSuccess && data?.data?.length > 0 ? data.data.slice(0, visibleCount) : [];

    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-4 w-full">
                    <h4 className="text-black/80 text-base font-semibold text-center capitalize">
                        Trending Tags Today
                    </h4>

                    {/* Tags */}
                    <div className="flex flex-row flex-wrap items-center w-full gap-2.5">
                        {tags.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className="py-1.5 px-4 rounded bg-[#e8eaf0] cursor-pointer"
                            >
                                <span className="text-sm font-medium">
                                    {item.name.replace(/[\[\]']+/g, "")}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {isSuccess && visibleCount < data.data.length && (
                        <div className="w-full flex justify-center pt-4">
                            <button
                                onClick={handleShowMore}
                                className="cursor-pointer px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
