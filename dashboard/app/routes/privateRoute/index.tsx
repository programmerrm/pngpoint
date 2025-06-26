import { useAuth } from "~/hooks/useAuth";
import { Outlet, Navigate } from 'react-router';
import { Sidebar } from "../sidebar";
import { Top } from "~/components/main/top";
import { Bottom } from "~/components/main/bottom";

export default function PrivateRoute() {
    const isAuthenticated = useAuth();
    return isAuthenticated ? (
        <section className="relative top-0 left-0 right-0 w-full h-screen overflow-hidden">
            <div className="flex flex-row flex-wrap justify-between w-full h-full">
                <div className="flex flex-col flex-wrap basis-[20%] xl:basis-[15%] h-full overflow-hidden">
                    <Sidebar />
                </div>
                <div className="flex flex-col flex-wrap basis-[80%] xl:basis-[85%] h-full">
                    <Top />
                    <Outlet />
                    <Bottom />
                </div>
            </div>
        </section>
    ) : <Navigate to="/login/" replace />
}
