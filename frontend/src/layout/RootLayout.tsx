import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Notification from "../components/notification/notification";

export default function RootLayout() {
    return (
        <Suspense>
            <Notification />
            <Outlet />
        </Suspense>
    );
}
