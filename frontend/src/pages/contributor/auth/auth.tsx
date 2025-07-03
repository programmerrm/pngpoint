import { Link } from "react-router-dom";
import { ReactIcons } from "../../../utils/reactIcons";
import { LoginForm } from "../../../components/forms/LoginForm";
import { RegisterForm } from "../../../components/forms/RegisterForm";

export default function ContributorAuth() {
    const { FaLongArrowAltLeft } = ReactIcons;
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full h-full">
                <div className="flex flex-col flex-wrap justify-center items-center w-full h-full">
                    <div className="flex flex-col flex-wrap justify-center items-center w-4/5 mx-auto h-4/5 bg-white px-5 shadow rounded-2xl">
                        <div className="flex flex-col flex-wrap justify-center items-center w-full h-[10%] relative">
                            <Link
                                className="flex flex-row items-center gap-x-2 cursor-pointer absolute top-1/2 left-2 -translate-y-1/2"
                                to="/"
                            >
                                <FaLongArrowAltLeft className="text-base" />
                                <span className="text-sm font-normal">Back To Home</span>
                            </Link>

                            <h2 className="text-black/70 text-2xl font-medium text-center">PNG Point Contributor Account</h2>
                        </div>
                        <div className="block w-full h-[90%] overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center pb-2.5 w-full h-full overflow-x-scroll auth-contributor">
                                <div className="flex flex-col flex-wrap w-full h-full border border-gray-400 rounded py-2.5 px-2.5">
                                    <div className="flex flex-col flex-wrap items-center justify-center w-full h-full px-5 gap-y-10">
                                        <div className="flex flex-col flex-wrap w-full">
                                            <h2 className="text-2xl font-bold text-center">Login Form</h2>
                                        </div>
                                        <div className="flex flex-col flex-wrap w-full">
                                            <LoginForm />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-wrap w-full h-full border border-gray-400 rounded py-2.5 px-2.5">
                                    <div className="flex flex-col flex-wrap items-center justify-center w-full h-full px-5 gap-y-10">
                                        <div className="flex flex-col flex-wrap w-full">
                                            <h2 className="text-2xl font-bold text-center">Register Form</h2>
                                        </div>
                                        <div className="flex flex-col flex-wrap w-full">
                                            <RegisterForm />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
