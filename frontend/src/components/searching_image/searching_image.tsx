import { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactIcons } from "../../utils/reactIcons";
import { setCategory, setTitle } from "../../redux/features/getImages/getImageSlice";
import { category_list } from "../../utils/category_list";


export default function SearchingImage() {
    const [value, setValue] = useState<string>('');
    const { IoSearchOutline } = ReactIcons;
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue(val);
        dispatch(setTitle(val));
    }

    const handleCategoryClick = (category: string) => {
        dispatch(setCategory(category));
    }

    return (
        <section className="relative top-0 left-0 right-0 py-2.5 md:py-5 w-full">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap items-center justify-center gap-y-5 w-full">
                    <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center uppercase">Free download transparent png files</h2>
                    <div className="flex flex-col flex-wrap w-full lg:w-[95%] xl:w-[60%] relative">
                        <input
                            className="bg-transparent text-white placeholder:text-white text-sm xl:text-base font-normal pl-4 md:pl-5 pr-[12%] md:pr-20 py-3 sm:py-4 border md:border-2 border-white outline-none rounded-full w-full [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
                            type="search"
                            name="search"
                            placeholder="Search images..."
                            value={value}
                            onChange={handleInputChange}
                        />
                        <button className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 cursor-pointer" type="button">
                            <IoSearchOutline className="text-white text-3xl md:text-4xl font-bold" />
                        </button>
                    </div>
                    <div className="flex flex-row flex-wrap gap-1.5 md:gap-3.5 items-center justify-center w-full lg:w-[95%] xl:w-[62%] pb-2.5">
                        {category_list?.map((item: any) => {
                            return (
                                <div key={item.id}>
                                    <button className="text-white text-xs xl:text-base font-medium cursor-pointer border-b md:border-b-2 hover:text-gray-300 duration-300" type="button" onClick={() => handleCategoryClick(item.value)}>{item.name}</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
