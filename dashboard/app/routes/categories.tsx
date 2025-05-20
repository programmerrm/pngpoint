import type { Route } from "./+types/categories";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PNG - Point Dashboard Categories" },
        { name: "description", content: "Welcome to png point dashboard!" },
    ];
}

export default function Categories() {
    return (
        <div className="flex flex-col flex-wrap px-10 py-3.5 w-full h-[82%]">
            <h2>Categories list</h2>
        </div>
    );
}
