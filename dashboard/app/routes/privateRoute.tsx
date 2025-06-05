import { Navigate, Outlet } from "react-router";
import { Bottom } from "~/components/main/bottom";
import { Top } from "~/components/main/top";
import { Sidebar } from "~/components/sidebar/sidebar";
import { useAuth } from "~/hooks/useAuth";

export default function PrivateRoute() {
    const isAuthenticated = useAuth();
    return isAuthenticated ? (
        <section className="relative top-0 left-0 right-0 w-full h-screen overflow-hidden">
            <div className="flex flex-row flex-wrap justify-between w-full h-full">
                <div className="flex flex-col flex-wrap basis-[15%] h-full overflow-hidden">
                    <Sidebar />
                </div>
                <div className="flex flex-col flex-wrap basis-[85%] h-full">
                    <Top />
                    <Outlet />
                    <Bottom /> 
                </div>
            </div>
        </section>
    ) : (
        <Navigate to="/login/" replace />
    );
}
