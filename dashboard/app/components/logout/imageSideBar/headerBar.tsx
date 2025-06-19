import { ReactIcons } from "~/lib/reactIcons";

export function HeaderBar({ count, onDelete }: { count: number; onDelete: () => void }) {
    const { RiDeleteBin6Line } = ReactIcons;
    return (
        <div className="flex justify-between items-center bg-gray-300 py-2.5 px-2.5 rounded">
            <p>{count} images selected</p>
            <button type="button" onClick={onDelete}>
                <RiDeleteBin6Line className="text-2xl" />
            </button>
        </div>
    );
}
