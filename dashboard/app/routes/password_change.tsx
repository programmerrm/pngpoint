import { PasswordChangeForm } from "~/components/forms/passwordChangeForm";
import type { Route } from "./+types/password_change";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "PNG - Point Dashboard Password Change" },
        { name: "description", content: "Welcome to png point dashboard!" },
    ];
}

export default function PasswordChange() {
    return (
        <div className="flex flex-col flex-wrap px-10 py-3.5 w-full h-[82%] relative overflow-hidden">
            <div className="flex flex-col flex-wrap justify-center items-center w-full h-full">
                <PasswordChangeForm />
            </div>
        </div>
    );
}
