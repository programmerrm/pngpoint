import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/privateRoute.tsx", [
        index("routes/dashboard.tsx"),
        route("/add-category/", "routes/addCategory.tsx"),
        route("/categories/", "routes/categories.tsx"),
    ]),
    route("/login/", "routes/login.tsx"),
] satisfies RouteConfig;
