import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    route("/login/", "routes/auth/login.tsx"),
    layout('routes/privateRoute/index.tsx', [
        ...prefix('dashboard', [
            index('routes/dashboard/index.tsx'),
            route('/upload-images/', 'routes/upload/index.tsx'),
            route('/total-images/', 'routes/total/index.tsx'),
            route('/approved-images/', 'routes/approved/index.tsx'),
        ]),
    ]),
    route('*', 'routes/notFound/index.tsx'),
] satisfies RouteConfig;
