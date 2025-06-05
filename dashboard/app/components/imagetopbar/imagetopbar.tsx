interface ImageTopBarProps {
    count: number;
    selectAll: boolean;
    onSelectAllChange: (checked: boolean) => void;
}

export default function ImageTopBar({ count, selectAll, onSelectAllChange }: ImageTopBarProps) {
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
                <div>
                    <button className="cursor-pointer" type="button">Deleted</button>
                </div>
            </div>
        </div>
    );
}
