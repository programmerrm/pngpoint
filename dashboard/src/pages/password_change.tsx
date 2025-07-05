import { PasswordChangeForm } from "../components/forms/passwordChangeForm";

export default function PasswordChange() {
    return (
        <div className="flex flex-col flex-wrap px-10 py-3.5 w-full h-[82%] relative overflow-hidden">
            <div className="flex flex-col flex-wrap justify-center items-center w-full h-full">
                <PasswordChangeForm />
            </div>
        </div>
    );
}
