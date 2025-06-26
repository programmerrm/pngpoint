import { useAllImageDeleteMutation } from "~/redux/features/images/deletedApi";

interface ImageTopBarProps {
    count: number;
    selectAll: boolean;
    onSelectAllChange: (checked: boolean) => void;
}

export default function ImageTopBar({ count, selectAll, onSelectAllChange }: ImageTopBarProps) {
    const [allImageDelete] = useAllImageDeleteMutation();
    const handleAllImagesDeleted = async () => {
        if (selectAll) {
            try {
                await allImageDelete().unwrap();
                alert("All images deleted successfully!");
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete images.");
            }
        } else {
            alert("Please all images seleted!");
        }
    }
    return (
        <div className="flex flex-row flex-wrap items-center justify-between h-[7%]">
            <h4 className="text-base font-medium">Total images : {count}</h4>
            <div className="flex flex-wrap items-center gap-x-5">
                <form action="">
                    <button className="cursor-pointer" type="submit">Upload CSV</button>
                </form>
                <div className="flex items-center gap-x-2">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => onSelectAllChange(e.target.checked)}
                    />
                    <span>Select All</span>
                </div>
                <div className="flex flex-col flex-wrap">
                    <button className="cursor-pointer" type="button" onClick={handleAllImagesDeleted}>Deleted</button>
                </div>
            </div>
        </div>
    );
}
