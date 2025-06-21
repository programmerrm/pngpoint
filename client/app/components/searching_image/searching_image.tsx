import { useState } from "react";
import { category_list } from "~/utils/category_list";
import { ReactIcons } from "~/utils/reactIcons";

export default function SearchingImage() {
    const [value, setValue] = useState<string>('');
    const { IoSearchOutline } = ReactIcons;
    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap items-center justify-center gap-y-5 w-full">
                    <h2 className="text-white text-4xl font-semibold uppercase">Free download transparent png files</h2>
                    <div className="flex flex-col flex-wrap w-[60%] relative">
                        <input
                            className="text-white placeholder:text-white text-base font-normal pl-5 pr-20 py-4 border-2 border-white outline-none rounded-full w-full [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
                            type="search"
                            name="search"
                            placeholder="Search images..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer" type="button">
                            <IoSearchOutline className="text-white text-4xl font-bold" />
                        </button>
                    </div>
                    <div className="flex flex-row flex-wrap gap-3.5 items-center justify-center w-[62%] pb-2.5">
                        {category_list?.map((item: any) => {
                            return (
                                <div key={item.id}>
                                    <button className="text-white text-base font-medium cursor-pointer border-b-2 hover:text-gray-300 duration-300" type="button">{item.name}</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
