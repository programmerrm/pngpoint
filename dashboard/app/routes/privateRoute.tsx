import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/hooks/useAuth";

export default function PrivateRoute() {
    const isAuthenticated = useAuth();
    console.log("PrivateRoute : ", isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login/" replace />;
}