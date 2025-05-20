import type { Route } from "./+types/addCategory";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PNG - Point Dashboard Add Category" },
        { name: "description", content: "Welcome to png point dashboard!" },
    ];
}

export default function AddCategory() {
    return (
        <div className="flex flex-col flex-wrap px-10 py-3.5 w-full h-[82%]">
            <h2>add-category</h2>
        </div>
    );
}
