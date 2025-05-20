import { Navigate, Outlet } from "react-router";
import { Bottom } from "~/components/main/bottom";
import { Top } from "~/components/main/top";
import { Sidebar } from "~/components/sidebar/sidebar";
import { useAuth } from "~/hooks/useAuth";

export default function PrivateRoute() {
    const isAuthenticated = useAuth();
    console.log("PrivateRoute : ", isAuthenticated)
    return isAuthenticated ? (
        <section className="relative top-0 left-0 right-0 w-full h-screen overflow-hidden">
            <div className="grid grid-cols-[20%_80%] w-full h-full">
                <div className="flex flex-col flex-wrap w-full h-full">
                    <Sidebar />
                </div>
                <div className="flex flex-col flex-wrap w-full h-full">
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
