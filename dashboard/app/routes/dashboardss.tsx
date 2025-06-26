import { Default } from "~/components/main/default";
// import type { Route } from "./+types/dashboard";

// export function meta({ }: Route.MetaArgs) {
//     return [
//         { title: "PNG - Point Dashboard" },
//         { name: "description", content: "Welcome to png point dashboard!" },
//     ];
// }

export default function Dashboard() {
    return (
        <div className="flex flex-col flex-wrap px-10 py-3.5 w-full h-[82%]">
            <Default />
        </div>
    );
}
