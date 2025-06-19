import { ReactIcons } from "~/lib/reactIcons";
import { useGetTotalImagesQuery } from "~/redux/features/images/totalImagesApi";
import type { MetaDataResponseType } from "~/types/metaDataResponseType";

export default function Images() {
    /* React icons */
    const { FaTag } = ReactIcons;
    /* Redux */
    const { data, isLoading, isError, isSuccess } = useGetTotalImagesQuery(undefined, { refetchOnMountOrArgChange: true });
    const images = data?.images ?? [];
    const count = images.length;
    /* Error or loading handling  */
    if (isLoading) {
        return (
            <div className="flex flex-col flex-wrap items-center justify-center h-[82%] relative">
                <div className="text-center py-10 text-gray-600">Loading images...</div>;
            </div>
        );
    }
    if (isError) {
        return (
            <div className="flex flex-col flex-wrap items-center justify-center h-[82%] relative">
                <div className="text-center py-10 text-red-600">Failed to load images.</div>;
            </div>
        );
    }
    
    return (
        <div className="flex flex-col flex-wrap px-10 pb-3.5 h-[82%] relative">
            <div className="flex flex-row flex-wrap items-center justify-between h-[7%]">
                <h4 className="text-base font-medium">Total images : {count}</h4>
            </div>
            <div className="flex flex-row flex-wrap justify-between w-full overflow-hidden h-[93%]">
                <div className={`flex flex-wrap items-center w-full h-full overflow-x-hidden overflow-y-scroll scrollbar-width`}>
                    <div className={`grid grid-cols-6 gap-5 py-5 w-full`}>
                        {!isError && !isLoading && isSuccess && images.map((item: MetaDataResponseType) => (
                            <div
                                className="flex flex-col items-center shadow-sm px-2.5 py-2.5 rounded-md border relative"
                                key={item.id}
                            >
                                <img
                                    className="w-full h-52 object-contain rounded-md cursor-pointer"
                                    src={item.url}
                                    alt=""
                                />
                                <div className="flex flex-row flex-wrap items-center justify-between absolute bottom-0 right-0 left-0 w-full py-2.5 px-2.5 bg-black/10 rounded-b-md z-50">
                                    <div className="flex flex-row flex-wrap items-center gap-x-1 text-gray-400">
                                        <FaTag className="text-sm" />
                                        <span className="text-sm">{item.keywords?.length ?? 0}</span>
                                    </div>
                                    <span
                                        className={`block w-2 h-2 rounded-full 
                                            ${item.status === "approved" ? "bg-green-600" : ""}
                                            ${item.status === "rejected" ? "bg-red-600" : ""}
                                            ${item.status === "pending" ? "bg-yellow-500" : ""}`}
                                    ></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
