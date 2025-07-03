import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import Single from "../pages/single/Single";
import NotFound from "../pages/notFound/NotFound";
import ContributorAuth from "../pages/contributor/auth/auth";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/image/:slug/",
                element: <Single />,
            },
            {
                path: '/contributor/auth/',
                element: <ContributorAuth />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
