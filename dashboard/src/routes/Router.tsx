import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard";
import PrivateRoute from "./privateRoute";
import Upload from "../pages/upload/index";
import TotalImages from "../pages/total";
import RejectedImages from "../pages/rejected/index";
import PendingImages from "../pages/pending/index";
import ApprovedImage from "../pages/approved/index";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/login/',
                element: <Login />,
            },
            {
                path: '/',
                element: <PrivateRoute />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: '/upload-images/',
                        element: <Upload />
                    },
                    {
                        path: '/total-images/',
                        element: <TotalImages />
                    },
                    {
                        path: '/approved-images/',
                        element: <ApprovedImage />
                    },
                    {
                        path: '/pending-images/',
                        element: <PendingImages />
                    },
                    {
                        path: '/rejected-images/',
                        element: <RejectedImages />
                    },
                ],
            },
        ],
    },
]);
