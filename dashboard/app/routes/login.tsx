import { LoginForm } from "~/components/forms/loginForm";

export default function Login() {
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full">
                <div className="flex flex-col flex-wrap justify-center items-center w-full h-full">
                    <div className="flex flex-col flex-wrap w-[40%] py-8 px-10 rounded-sm shadow-base login">
                        <h2 className="text-white text-3xl font-bold">Login Form</h2>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
