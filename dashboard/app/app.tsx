import { Suspense } from "react";
import { Outlet } from "react-router";
import { Notification } from "./components/notification/notification";

export default function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Notification />
            <Outlet />
        </Suspense>
    );
}